/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import {
	freshdeskApiRequest,
	freshdeskApiRequestAllItems,
	freshdeskSearchRequest,
	freshdeskFilterRequest,
	cleanRequestBody,
} from './transport/GenericFunctions';

import { ticketOperations, ticketFields } from './actions/ticket';
import { contactOperations, contactFields } from './actions/contact';
import { companyOperations, companyFields } from './actions/company';
import { agentOperations, agentFields } from './actions/agent';
import { groupOperations, groupFields } from './actions/group';
import { conversationOperations, conversationFields } from './actions/conversation';
import { cannedResponseOperations, cannedResponseFields } from './actions/cannedResponse';
import { solutionOperations, solutionFields } from './actions/solution';
import { timeEntryOperations, timeEntryFields } from './actions/timeEntry';
import { productOperations, productFields } from './actions/product';

export class Freshdesk implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Freshdesk',
		name: 'freshdesk',
		icon: 'file:freshdesk.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Freshdesk API',
		defaults: {
			name: 'Freshdesk',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'freshdeskApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Agent', value: 'agent' },
					{ name: 'Canned Response', value: 'cannedResponse' },
					{ name: 'Company', value: 'company' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Conversation', value: 'conversation' },
					{ name: 'Group', value: 'group' },
					{ name: 'Product', value: 'product' },
					{ name: 'Solution', value: 'solution' },
					{ name: 'Ticket', value: 'ticket' },
					{ name: 'Time Entry', value: 'timeEntry' },
				],
				default: 'ticket',
			},
			...ticketOperations,
			...ticketFields,
			...contactOperations,
			...contactFields,
			...companyOperations,
			...companyFields,
			...agentOperations,
			...agentFields,
			...groupOperations,
			...groupFields,
			...conversationOperations,
			...conversationFields,
			...cannedResponseOperations,
			...cannedResponseFields,
			...solutionOperations,
			...solutionFields,
			...timeEntryOperations,
			...timeEntryFields,
			...productOperations,
			...productFields,
		],
	};

	methods = {
		loadOptions: {
			async getAgents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const agents = await freshdeskApiRequestAllItems.call(this, 'GET', '/agents') as IDataObject[];
				return agents.map((agent) => {
					const contact = agent.contact as IDataObject | undefined;
					const name = contact?.name as string || 'Unknown';
					const email = contact?.email as string || String(agent.id);
					return {
						name: `${name} (${email})`,
						value: agent.id as number,
					};
				});
			},

			async getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const groups = await freshdeskApiRequestAllItems.call(this, 'GET', '/groups') as IDataObject[];
				return groups.map((group) => ({
					name: group.name as string,
					value: group.id as number,
				}));
			},

			async getProducts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const products = await freshdeskApiRequestAllItems.call(this, 'GET', '/products') as IDataObject[];
				return products.map((product) => ({
					name: product.name as string,
					value: product.id as number,
				}));
			},

			async getCompanies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const companies = await freshdeskApiRequestAllItems.call(this, 'GET', '/companies') as IDataObject[];
				return companies.map((company) => ({
					name: company.name as string,
					value: company.id as number,
				}));
			},

			async getTicketTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const fields = await freshdeskApiRequest.call(this, 'GET', '/ticket_fields') as IDataObject[];
				const typeField = fields.find((f) => f.name === 'ticket_type');
				if (typeField && typeField.choices) {
					return (typeField.choices as string[]).map((choice) => ({
						name: choice,
						value: choice,
					}));
				}
				return [];
			},

			async getCannedResponseFolders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const folders = await freshdeskApiRequestAllItems.call(this, 'GET', '/canned_response_folders') as IDataObject[];
				return folders.map((folder) => ({
					name: folder.name as string,
					value: folder.id as number,
				}));
			},

			async getSolutionCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const categories = await freshdeskApiRequestAllItems.call(this, 'GET', '/solutions/categories') as IDataObject[];
				return categories.map((category) => ({
					name: category.name as string,
					value: category.id as number,
				}));
			},

			async getSolutionFolders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const categories = await freshdeskApiRequestAllItems.call(this, 'GET', '/solutions/categories') as IDataObject[];
				const options: INodePropertyOptions[] = [];
				for (const category of categories) {
					const folders = await freshdeskApiRequestAllItems.call(
						this,
						'GET',
						`/solutions/categories/${category.id}/folders`,
					) as IDataObject[];
					for (const folder of folders) {
						options.push({
							name: `${category.name} / ${folder.name}`,
							value: folder.id as number,
						});
					}
				}
				return options;
			},

			async getRoles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const roles = await freshdeskApiRequestAllItems.call(this, 'GET', '/roles') as IDataObject[];
				return roles.map((role) => ({
					name: role.name as string,
					value: role.id as number,
				}));
			},

			async getTicketFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const filters = await freshdeskApiRequest.call(this, 'GET', '/tickets/filters') as IDataObject[];
					return filters.map((filter) => ({
						name: filter.name as string,
						value: filter.id as number,
					}));
				} catch {
					return [];
				}
			},

			async getContactFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const filters = await freshdeskApiRequest.call(this, 'GET', '/contacts/filters') as IDataObject[];
					return filters.map((filter) => ({
						name: filter.name as string,
						value: filter.id as number,
					}));
				} catch {
					return [];
				}
			},

			async getCompanyFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const filters = await freshdeskApiRequest.call(this, 'GET', '/companies/filters') as IDataObject[];
					return filters.map((filter) => ({
						name: filter.name as string,
						value: filter.id as number,
					}));
				} catch {
					return [];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Log licensing notice once per execution
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				// ========== TICKET RESOURCE ==========
				if (resource === 'ticket') {
					if (operation === 'create') {
						const body: IDataObject = {
							subject: this.getNodeParameter('subject', i) as string,
							description: this.getNodeParameter('description', i) as string,
							email: this.getNodeParameter('email', i) as string,
							priority: this.getNodeParameter('priority', i) as number,
							status: this.getNodeParameter('status', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.cc_emails && typeof additionalFields.cc_emails === 'string') {
							body.cc_emails = (additionalFields.cc_emails as string).split(',').map((e) => e.trim());
						}
						if (additionalFields.tags && typeof additionalFields.tags === 'string') {
							body.tags = (additionalFields.tags as string).split(',').map((t) => t.trim());
						}
						if (additionalFields.custom_fields) {
							body.custom_fields = additionalFields.custom_fields;
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', '/tickets', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const includeOptions = this.getNodeParameter('include', i, []) as string[];
						const qs: IDataObject = {};
						if (includeOptions.length > 0) {
							qs.include = includeOptions.join(',');
						}
						responseData = await freshdeskApiRequest.call(this, 'GET', `/tickets/${ticketId}`, {}, qs);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = { ...filters };

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/tickets', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/tickets', {}, qs, limit);
						}
					} else if (operation === 'update') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.cc_emails && typeof updateFields.cc_emails === 'string') {
							updateFields.cc_emails = (updateFields.cc_emails as string).split(',').map((e) => e.trim());
						}
						if (updateFields.tags && typeof updateFields.tags === 'string') {
							updateFields.tags = (updateFields.tags as string).split(',').map((t) => t.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/tickets/${ticketId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/tickets/${ticketId}`);
						responseData = { success: true };
					} else if (operation === 'restore') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						await freshdeskApiRequest.call(this, 'PUT', `/tickets/${ticketId}/restore`);
						responseData = { success: true };
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskSearchRequest.call(this, 'tickets', query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskSearchRequest.call(this, 'tickets', query, limit);
						}
					} else if (operation === 'filter') {
						const filterId = this.getNodeParameter('filterId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskFilterRequest.call(this, 'tickets', filterId);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskFilterRequest.call(this, 'tickets', filterId, limit);
						}
					} else if (operation === 'reply') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const body: IDataObject = {
							body: this.getNodeParameter('body', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.cc_emails && typeof additionalFields.cc_emails === 'string') {
							body.cc_emails = (additionalFields.cc_emails as string).split(',').map((e) => e.trim());
						}
						if (additionalFields.bcc_emails && typeof additionalFields.bcc_emails === 'string') {
							body.bcc_emails = (additionalFields.bcc_emails as string).split(',').map((e) => e.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', `/tickets/${ticketId}/reply`, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'addNote') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const body: IDataObject = {
							body: this.getNodeParameter('body', i) as string,
							private: this.getNodeParameter('private', i, true) as boolean,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.notify_emails && typeof additionalFields.notify_emails === 'string') {
							body.notify_emails = (additionalFields.notify_emails as string).split(',').map((e) => e.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', `/tickets/${ticketId}/notes`, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'getConversations') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/conversations`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/conversations`, {}, {}, limit);
						}
					} else if (operation === 'addWatcher') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'POST', `/tickets/${ticketId}/watchers`, { user_id: userId });
					} else if (operation === 'merge') {
						const primaryTicketId = this.getNodeParameter('primaryTicketId', i) as number;
						const secondaryTicketIds = this.getNodeParameter('secondaryTicketIds', i) as string;
						const ticketIds = secondaryTicketIds.split(',').map((id) => parseInt(id.trim(), 10));
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/tickets/${primaryTicketId}/merge`, { secondary_ticket_ids: ticketIds });
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== CONTACT RESOURCE ==========
				else if (resource === 'contact') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.other_emails && typeof additionalFields.other_emails === 'string') {
							body.other_emails = (additionalFields.other_emails as string).split(',').map((e) => e.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', '/contacts', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/contacts/${contactId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = { ...filters };

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/contacts', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/contacts', {}, qs, limit);
						}
					} else if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.other_emails && typeof updateFields.other_emails === 'string') {
							updateFields.other_emails = (updateFields.other_emails as string).split(',').map((e) => e.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/contacts/${contactId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as number;
						const permanentDelete = this.getNodeParameter('permanentDelete', i, false) as boolean;
						const endpoint = permanentDelete ? `/contacts/${contactId}/hard_delete` : `/contacts/${contactId}`;
						await freshdeskApiRequest.call(this, 'DELETE', endpoint);
						responseData = { success: true };
					} else if (operation === 'restore') {
						const contactId = this.getNodeParameter('contactId', i) as number;
						await freshdeskApiRequest.call(this, 'PUT', `/contacts/${contactId}/restore`);
						responseData = { success: true };
					} else if (operation === 'merge') {
						const primaryContactId = this.getNodeParameter('primaryContactId', i) as number;
						const secondaryContactIds = this.getNodeParameter('secondaryContactIds', i) as string;
						const contactIds = secondaryContactIds.split(',').map((id) => parseInt(id.trim(), 10));
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/contacts/${primaryContactId}/merge`, { secondary_contact_ids: contactIds });
					} else if (operation === 'makeAgent') {
						const contactId = this.getNodeParameter('contactId', i) as number;
						const agentOptions = this.getNodeParameter('agentOptions', i, {}) as IDataObject;
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/contacts/${contactId}/make_agent`, cleanRequestBody(agentOptions) as IDataObject);
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskSearchRequest.call(this, 'contacts', query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskSearchRequest.call(this, 'contacts', query, limit);
						}
					} else if (operation === 'filter') {
						const filterId = this.getNodeParameter('filterId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskFilterRequest.call(this, 'contacts', filterId);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskFilterRequest.call(this, 'contacts', filterId, limit);
						}
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== COMPANY RESOURCE ==========
				else if (resource === 'company') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.domains && typeof additionalFields.domains === 'string') {
							body.domains = (additionalFields.domains as string).split(',').map((d) => d.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', '/companies', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const companyId = this.getNodeParameter('companyId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/companies/${companyId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/companies');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/companies', {}, {}, limit);
						}
					} else if (operation === 'update') {
						const companyId = this.getNodeParameter('companyId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.domains && typeof updateFields.domains === 'string') {
							updateFields.domains = (updateFields.domains as string).split(',').map((d) => d.trim());
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/companies/${companyId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const companyId = this.getNodeParameter('companyId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/companies/${companyId}`);
						responseData = { success: true };
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskSearchRequest.call(this, 'companies', query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskSearchRequest.call(this, 'companies', query, limit);
						}
					} else if (operation === 'filter') {
						const filterId = this.getNodeParameter('filterId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskFilterRequest.call(this, 'companies', filterId);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskFilterRequest.call(this, 'companies', filterId, limit);
						}
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== AGENT RESOURCE ==========
				else if (resource === 'agent') {
					if (operation === 'create') {
						const body: IDataObject = {
							email: this.getNodeParameter('email', i) as string,
							ticket_scope: this.getNodeParameter('ticketScope', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.role_ids && typeof additionalFields.role_ids === 'string') {
							body.role_ids = (additionalFields.role_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}
						if (additionalFields.group_ids && typeof additionalFields.group_ids === 'string') {
							body.group_ids = (additionalFields.group_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', '/agents', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const agentId = this.getNodeParameter('agentId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/agents/${agentId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = { ...filters };

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/agents', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/agents', {}, qs, limit);
						}
					} else if (operation === 'update') {
						const agentId = this.getNodeParameter('agentId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.role_ids && typeof updateFields.role_ids === 'string') {
							updateFields.role_ids = (updateFields.role_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}
						if (updateFields.group_ids && typeof updateFields.group_ids === 'string') {
							updateFields.group_ids = (updateFields.group_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/agents/${agentId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const agentId = this.getNodeParameter('agentId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/agents/${agentId}`);
						responseData = { success: true };
					} else if (operation === 'filter') {
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/agents', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/agents', {}, filters, limit);
						}
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== GROUP RESOURCE ==========
				else if (resource === 'group') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.agent_ids && typeof additionalFields.agent_ids === 'string') {
							body.agent_ids = (additionalFields.agent_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', '/groups', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const groupId = this.getNodeParameter('groupId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/groups/${groupId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/groups');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/groups', {}, {}, limit);
						}
					} else if (operation === 'update') {
						const groupId = this.getNodeParameter('groupId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.agent_ids && typeof updateFields.agent_ids === 'string') {
							updateFields.agent_ids = (updateFields.agent_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/groups/${groupId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const groupId = this.getNodeParameter('groupId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/groups/${groupId}`);
						responseData = { success: true };
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== CONVERSATION RESOURCE ==========
				else if (resource === 'conversation') {
					if (operation === 'create') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const messageType = this.getNodeParameter('type', i) as string;
						const body: IDataObject = {
							body: this.getNodeParameter('body', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						if (additionalFields.cc_emails && typeof additionalFields.cc_emails === 'string') {
							body.cc_emails = (additionalFields.cc_emails as string).split(',').map((e) => e.trim());
						}
						if (additionalFields.bcc_emails && typeof additionalFields.bcc_emails === 'string') {
							body.bcc_emails = (additionalFields.bcc_emails as string).split(',').map((e) => e.trim());
						}
						if (additionalFields.notify_emails && typeof additionalFields.notify_emails === 'string') {
							body.notify_emails = (additionalFields.notify_emails as string).split(',').map((e) => e.trim());
						}

						const endpoint = messageType === 'note' ? `/tickets/${ticketId}/notes` : `/tickets/${ticketId}/reply`;
						if (messageType === 'note') {
							body.private = additionalFields.private !== false;
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', endpoint, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'getAll') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/conversations`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/conversations`, {}, {}, limit);
						}
					} else if (operation === 'update') {
						const conversationId = this.getNodeParameter('conversationId', i) as number;
						const body: IDataObject = {
							body: this.getNodeParameter('body', i) as string,
						};
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/conversations/${conversationId}`, body);
					} else if (operation === 'delete') {
						const conversationId = this.getNodeParameter('conversationId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/conversations/${conversationId}`);
						responseData = { success: true };
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== CANNED RESPONSE RESOURCE ==========
				else if (resource === 'cannedResponse') {
					if (operation === 'create') {
						const body: IDataObject = {
							title: this.getNodeParameter('title', i) as string,
							content: this.getNodeParameter('content', i) as string,
							folder_id: this.getNodeParameter('folderId', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						responseData = await freshdeskApiRequest.call(this, 'POST', '/canned_responses', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const responseId = this.getNodeParameter('responseId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/canned_responses/${responseId}`);
					} else if (operation === 'getAll') {
						const folderId = this.getNodeParameter('folderId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/canned_response_folders/${folderId}/canned_responses`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/canned_response_folders/${folderId}/canned_responses`, {}, {}, limit);
						}
					} else if (operation === 'update') {
						const responseId = this.getNodeParameter('responseId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/canned_responses/${responseId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const responseId = this.getNodeParameter('responseId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/canned_responses/${responseId}`);
						responseData = { success: true };
					} else if (operation === 'getFolders') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/canned_response_folders');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/canned_response_folders', {}, {}, limit);
						}
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== SOLUTION RESOURCE ==========
				else if (resource === 'solution') {
					if (operation === 'createCategory') {
						const body: IDataObject = {
							name: this.getNodeParameter('categoryName', i) as string,
						};
						const description = this.getNodeParameter('categoryDescription', i, '') as string;
						if (description) {
							body.description = description;
						}
						responseData = await freshdeskApiRequest.call(this, 'POST', '/solutions/categories', body);
					} else if (operation === 'createFolder') {
						const categoryId = this.getNodeParameter('categoryId', i) as number;
						const body: IDataObject = {
							name: this.getNodeParameter('folderName', i) as string,
							visibility: this.getNodeParameter('visibility', i) as number,
						};
						const folderOptions = this.getNodeParameter('folderOptions', i, {}) as IDataObject;
						Object.assign(body, folderOptions);

						if (folderOptions.company_ids && typeof folderOptions.company_ids === 'string') {
							body.company_ids = (folderOptions.company_ids as string).split(',').map((id) => parseInt(id.trim(), 10));
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', `/solutions/categories/${categoryId}/folders`, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'createArticle') {
						const folderId = this.getNodeParameter('folderId', i) as number;
						const body: IDataObject = {
							title: this.getNodeParameter('title', i) as string,
							description: this.getNodeParameter('description', i) as string,
							status: this.getNodeParameter('status', i) as number,
						};
						const articleOptions = this.getNodeParameter('articleOptions', i, {}) as IDataObject;

						if (articleOptions.tags && typeof articleOptions.tags === 'string') {
							body.tags = (articleOptions.tags as string).split(',').map((t) => t.trim());
						}
						if (articleOptions.seo_data) {
							const seoData = articleOptions.seo_data as IDataObject;
							if (seoData.seo) {
								body.seo_data = seoData.seo;
							}
						}

						responseData = await freshdeskApiRequest.call(this, 'POST', `/solutions/folders/${folderId}/articles`, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'getArticle') {
						const articleId = this.getNodeParameter('articleId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/solutions/articles/${articleId}`);
					} else if (operation === 'getAllArticles') {
						const folderId = this.getNodeParameter('folderId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/solutions/folders/${folderId}/articles`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/solutions/folders/${folderId}/articles`, {}, {}, limit);
						}
					} else if (operation === 'updateArticle') {
						const articleId = this.getNodeParameter('articleId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.tags && typeof updateFields.tags === 'string') {
							updateFields.tags = (updateFields.tags as string).split(',').map((t) => t.trim());
						}
						if (updateFields.seo_data) {
							const seoData = updateFields.seo_data as IDataObject;
							if (seoData.seo) {
								updateFields.seo_data = seoData.seo;
							}
						}

						responseData = await freshdeskApiRequest.call(this, 'PUT', `/solutions/articles/${articleId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'deleteArticle') {
						const articleId = this.getNodeParameter('articleId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/solutions/articles/${articleId}`);
						responseData = { success: true };
					} else if (operation === 'translateArticle') {
						const articleId = this.getNodeParameter('articleId', i) as number;
						const languageCode = this.getNodeParameter('languageCode', i) as string;
						const body: IDataObject = {
							title: this.getNodeParameter('translatedTitle', i) as string,
							description: this.getNodeParameter('translatedDescription', i) as string,
							status: this.getNodeParameter('translationStatus', i) as number,
						};
						responseData = await freshdeskApiRequest.call(this, 'POST', `/solutions/articles/${articleId}/${languageCode}`, body);
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== TIME ENTRY RESOURCE ==========
				else if (resource === 'timeEntry') {
					if (operation === 'create') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const body: IDataObject = {
							time_spent: this.getNodeParameter('timeSpent', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						responseData = await freshdeskApiRequest.call(this, 'POST', `/tickets/${ticketId}/time_entries`, cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const timeEntryId = this.getNodeParameter('timeEntryId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/time_entries/${timeEntryId}`);
					} else if (operation === 'getAll') {
						const ticketId = this.getNodeParameter('ticketId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/time_entries`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', `/tickets/${ticketId}/time_entries`, {}, {}, limit);
						}
					} else if (operation === 'update') {
						const timeEntryId = this.getNodeParameter('timeEntryId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/time_entries/${timeEntryId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const timeEntryId = this.getNodeParameter('timeEntryId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/time_entries/${timeEntryId}`);
						responseData = { success: true };
					} else if (operation === 'toggleTimer') {
						const timeEntryId = this.getNodeParameter('timeEntryId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/time_entries/${timeEntryId}/toggle_timer`);
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== PRODUCT RESOURCE ==========
				else if (resource === 'product') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						responseData = await freshdeskApiRequest.call(this, 'POST', '/products', cleanRequestBody(body) as IDataObject);
					} else if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as number;
						responseData = await freshdeskApiRequest.call(this, 'GET', `/products/${productId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/products');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await freshdeskApiRequestAllItems.call(this, 'GET', '/products', {}, {}, limit);
						}
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await freshdeskApiRequest.call(this, 'PUT', `/products/${productId}`, cleanRequestBody(updateFields) as IDataObject);
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as number;
						await freshdeskApiRequest.call(this, 'DELETE', `/products/${productId}`);
						responseData = { success: true };
					} else {
						responseData = { error: `Unknown operation: ${operation}` };
					}
				}

				// ========== UNKNOWN RESOURCE ==========
				else {
					responseData = { error: `Unknown resource: ${resource}` };
				}

				// Handle response data
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
