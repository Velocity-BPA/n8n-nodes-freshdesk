/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import { freshdeskApiRequest } from './transport/GenericFunctions';

export class FreshdeskTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Freshdesk Trigger',
		name: 'freshdeskTrigger',
		icon: 'file:freshdesk.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Freshdesk events via webhooks',
		defaults: {
			name: 'Freshdesk Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'freshdeskApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'ticketCreate',
				options: [
					{
						name: 'Ticket Created',
						value: 'ticketCreate',
						description: 'Triggered when a new ticket is created',
					},
					{
						name: 'Ticket Updated',
						value: 'ticketUpdate',
						description: 'Triggered when a ticket is updated',
					},
					{
						name: 'Ticket Deleted',
						value: 'ticketDelete',
						description: 'Triggered when a ticket is deleted',
					},
					{
						name: 'Note Added',
						value: 'noteCreate',
						description: 'Triggered when a note is added to a ticket',
					},
					{
						name: 'Reply Received',
						value: 'replyCreate',
						description: 'Triggered when a reply is added to a ticket',
					},
					{
						name: 'Agent Assigned',
						value: 'agentAssign',
						description: 'Triggered when an agent is assigned to a ticket',
					},
					{
						name: 'Status Changed',
						value: 'statusChange',
						description: 'Triggered when ticket status changes',
					},
					{
						name: 'Priority Changed',
						value: 'priorityChange',
						description: 'Triggered when ticket priority changes',
					},
					{
						name: 'All Events',
						value: 'all',
						description: 'Triggered on any webhook event',
					},
				],
				description: 'The event to listen for',
			},
			{
				displayName: 'Setup Instructions',
				name: 'setupNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						event: [
							'ticketCreate',
							'ticketUpdate',
							'ticketDelete',
							'noteCreate',
							'replyCreate',
							'agentAssign',
							'statusChange',
							'priorityChange',
							'all',
						],
					},
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-description-unneeded-backticks
				description: `To set up the webhook in Freshdesk:
1. Go to Admin > Automations > Automation Rules
2. Create a new rule with the desired trigger conditions
3. Add an action: "Trigger Webhook"
4. Paste the webhook URL shown below
5. Select POST method and JSON content type
6. Configure the payload with ticket/conversation data`,
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Include Full Ticket',
						name: 'includeFullTicket',
						type: 'boolean',
						default: false,
						description: 'Whether to fetch the full ticket data when receiving webhook',
					},
					{
						displayName: 'Include Conversations',
						name: 'includeConversations',
						type: 'boolean',
						default: false,
						description: 'Whether to include ticket conversations in the response',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Freshdesk doesn't have an API to manage webhooks programmatically
				// Webhooks are configured through automation rules in the Freshdesk admin
				// We just return true to indicate the webhook can be used
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Log the webhook URL for the user to configure in Freshdesk
				const webhookUrl = this.getNodeWebhookUrl('default');
				this.logger.info(`Freshdesk Webhook URL: ${webhookUrl}`);
				this.logger.info(
					'Configure this URL in Freshdesk Admin > Automations > Automation Rules',
				);

				// Log licensing notice
				this.logger.warn(
					'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
					'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
					'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
				);

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Webhooks are managed manually in Freshdesk automation rules
				// Nothing to delete programmatically
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const event = this.getNodeParameter('event') as string;
		const options = this.getNodeParameter('options', {}) as {
			includeFullTicket?: boolean;
			includeConversations?: boolean;
		};

		// Get the incoming webhook data
		const body = req.body as IDataObject;

		// Determine the event type from the webhook payload
		const freshdeskWebhook = body.freshdesk_webhook as IDataObject | undefined;
		const webhookEvent = (freshdeskWebhook?.event as string) || 'unknown';

		// Filter by event type if not listening to all events
		if (event !== 'all') {
			const eventMap: Record<string, string[]> = {
				ticketCreate: ['ticket_create', 'ticket.created'],
				ticketUpdate: ['ticket_update', 'ticket.updated'],
				ticketDelete: ['ticket_delete', 'ticket.deleted'],
				noteCreate: ['note_create', 'note.created', 'private_note.created'],
				replyCreate: ['reply_create', 'reply.created'],
				agentAssign: ['agent_assign', 'ticket.agent_assigned'],
				statusChange: ['status_change', 'ticket.status_updated'],
				priorityChange: ['priority_change', 'ticket.priority_updated'],
			};

			const allowedEvents = eventMap[event] || [];
			if (!allowedEvents.some((e) => webhookEvent.toLowerCase().includes(e.toLowerCase()))) {
				// Event doesn't match the filter, but we still need to acknowledge it
				return {
					workflowData: [],
				};
			}
		}

		// Optionally fetch full ticket data
		let responseData: IDataObject = body;

		if (options.includeFullTicket && body.ticket_id) {
			try {
				let endpoint = `/tickets/${body.ticket_id}`;
				if (options.includeConversations) {
					endpoint += '?include=conversations';
				}
				const ticketData = await freshdeskApiRequest.call(this, 'GET', endpoint) as IDataObject;
				responseData = {
					...body,
					ticket: ticketData,
				};
			} catch (error) {
				// If we can't fetch the ticket, just return the webhook data
				responseData = {
					...body,
					error: `Could not fetch ticket: ${(error as Error).message}`,
				};
			}
		}

		return {
			workflowData: [this.helpers.returnJsonArray(responseData)],
		};
	}
}
