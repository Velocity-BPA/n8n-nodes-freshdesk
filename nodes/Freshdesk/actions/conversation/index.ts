/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const conversationOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['conversation'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a reply or note on a ticket',
        action: 'Create a conversation',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a conversation',
        action: 'Delete a conversation',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get all conversations for a ticket',
        action: 'Get many conversations',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a note',
        action: 'Update a conversation',
      },
    ],
    default: 'create',
  },
];

export const conversationFields: INodeProperties[] = [
  // ----------------------------------
  //         conversation:create
  // ----------------------------------
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create', 'getAll'],
      },
    },
    description: 'ID of the ticket',
  },
  {
    displayName: 'Conversation Type',
    name: 'conversationType',
    type: 'options',
    required: true,
    default: 'reply',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Reply', value: 'reply' },
      { name: 'Note', value: 'note' },
    ],
    description: 'Type of conversation to create',
  },
  {
    displayName: 'Body',
    name: 'body',
    type: 'string',
    typeOptions: { rows: 5 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    description: 'HTML content of the conversation',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'BCC Emails',
        name: 'bcc_emails',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            '/conversationType': ['reply'],
          },
        },
        description: 'Comma-separated list of BCC emails',
      },
      {
        displayName: 'CC Emails',
        name: 'cc_emails',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            '/conversationType': ['reply'],
          },
        },
        description: 'Comma-separated list of CC emails',
      },
      {
        displayName: 'From Email',
        name: 'from_email',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            '/conversationType': ['reply'],
          },
        },
        description: 'Email address to send from',
      },
      {
        displayName: 'Incoming',
        name: 'incoming',
        type: 'boolean',
        default: false,
        description: 'Whether the reply is from the requester',
      },
      {
        displayName: 'Notify Emails',
        name: 'notify_emails',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            '/conversationType': ['note'],
          },
        },
        description: 'Comma-separated list of emails to notify',
      },
      {
        displayName: 'Private',
        name: 'private',
        type: 'boolean',
        default: true,
        displayOptions: {
          show: {
            '/conversationType': ['note'],
          },
        },
        description: 'Whether the note is private',
      },
      {
        displayName: 'User ID',
        name: 'user_id',
        type: 'number',
        default: 0,
        description: 'ID of the user creating the conversation',
      },
    ],
  },

  // ----------------------------------
  //         conversation:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 50,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         conversation:update
  // ----------------------------------
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['update', 'delete'],
      },
    },
    description: 'ID of the conversation',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        typeOptions: { rows: 5 },
        default: '',
        description: 'HTML content of the note',
      },
    ],
  },
];
