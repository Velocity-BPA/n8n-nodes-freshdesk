/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const ticketOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['ticket'],
      },
    },
    options: [
      {
        name: 'Add Note',
        value: 'addNote',
        description: 'Add a private note to a ticket',
        action: 'Add a note to a ticket',
      },
      {
        name: 'Add Watcher',
        value: 'addWatcher',
        description: 'Add a watcher to a ticket',
        action: 'Add a watcher to a ticket',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new ticket',
        action: 'Create a ticket',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a ticket',
        action: 'Delete a ticket',
      },
      {
        name: 'Filter',
        value: 'filter',
        description: 'Filter tickets using a predefined filter',
        action: 'Filter tickets',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a ticket by ID',
        action: 'Get a ticket',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many tickets',
        action: 'Get many tickets',
      },
      {
        name: 'Get Conversations',
        value: 'getConversations',
        description: 'Get all conversations for a ticket',
        action: 'Get ticket conversations',
      },
      {
        name: 'Merge',
        value: 'merge',
        description: 'Merge tickets into a primary ticket',
        action: 'Merge tickets',
      },
      {
        name: 'Reply',
        value: 'reply',
        description: 'Reply to a ticket',
        action: 'Reply to a ticket',
      },
      {
        name: 'Restore',
        value: 'restore',
        description: 'Restore a deleted ticket',
        action: 'Restore a ticket',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search tickets',
        action: 'Search tickets',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a ticket',
        action: 'Update a ticket',
      },
    ],
    default: 'create',
  },
];

export const ticketFields: INodeProperties[] = [
  // ----------------------------------
  //         ticket:create
  // ----------------------------------
  {
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    description: 'Subject of the ticket',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    typeOptions: {
      rows: 5,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    description: 'HTML content of the ticket',
  },
  {
    displayName: 'Requester Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    description: 'Email address of the requester',
  },
  {
    displayName: 'Priority',
    name: 'priority',
    type: 'options',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Low', value: 1 },
      { name: 'Medium', value: 2 },
      { name: 'High', value: 3 },
      { name: 'Urgent', value: 4 },
    ],
    description: 'Priority of the ticket',
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    required: true,
    default: 2,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Open', value: 2 },
      { name: 'Pending', value: 3 },
      { name: 'Resolved', value: 4 },
      { name: 'Closed', value: 5 },
    ],
    description: 'Status of the ticket',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'CC Emails',
        name: 'cc_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list of CC emails',
      },
      {
        displayName: 'Custom Fields',
        name: 'custom_fields',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'field',
            displayName: 'Field',
            values: [
              {
                displayName: 'Field Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Name of the custom field (without cf_ prefix)',
              },
              {
                displayName: 'Field Value',
                name: 'value',
                type: 'string',
                default: '',
                description: 'Value of the custom field',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Due By',
        name: 'due_by',
        type: 'dateTime',
        default: '',
        description: 'Timestamp for due date',
      },
      {
        displayName: 'First Response Due By',
        name: 'fr_due_by',
        type: 'dateTime',
        default: '',
        description: 'Timestamp for first response due date',
      },
      {
        displayName: 'Group Name or ID',
        name: 'group_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getGroups',
        },
        default: '',
        description: 'ID of the group to assign the ticket to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Product Name or ID',
        name: 'product_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getProducts',
        },
        default: '',
        description: 'ID of the product associated with the ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Responder Name or ID',
        name: 'responder_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getAgents',
        },
        default: '',
        description: 'ID of the agent to assign the ticket to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Source',
        name: 'source',
        type: 'options',
        default: 2,
        options: [
          { name: 'Email', value: 1 },
          { name: 'Portal', value: 2 },
          { name: 'Phone', value: 3 },
          { name: 'Chat', value: 7 },
          { name: 'Feedback Widget', value: 9 },
          { name: 'Outbound Email', value: 10 },
        ],
        description: 'Source of the ticket',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'string',
        default: '',
        description: 'Type of the ticket',
      },
    ],
  },

  // ----------------------------------
  //         ticket:get
  // ----------------------------------
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['get', 'update', 'delete', 'restore', 'reply', 'addNote', 'getConversations', 'addWatcher', 'merge'],
      },
    },
    description: 'ID of the ticket',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['get'],
      },
    },
    options: [
      {
        displayName: 'Include',
        name: 'include',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Company', value: 'company' },
          { name: 'Description', value: 'description' },
          { name: 'Requester', value: 'requester' },
          { name: 'Stats', value: 'stats' },
        ],
        description: 'Additional information to include',
      },
    ],
  },

  // ----------------------------------
  //         ticket:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['ticket'],
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
        resource: ['ticket'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Include',
        name: 'include',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Company', value: 'company' },
          { name: 'Description', value: 'description' },
          { name: 'Requester', value: 'requester' },
          { name: 'Stats', value: 'stats' },
        ],
        description: 'Additional information to include',
      },
      {
        displayName: 'Order By',
        name: 'order_by',
        type: 'options',
        default: 'created_at',
        options: [
          { name: 'Created At', value: 'created_at' },
          { name: 'Due By', value: 'due_by' },
          { name: 'Updated At', value: 'updated_at' },
        ],
        description: 'Field to order results by',
      },
      {
        displayName: 'Order Type',
        name: 'order_type',
        type: 'options',
        default: 'desc',
        options: [
          { name: 'Ascending', value: 'asc' },
          { name: 'Descending', value: 'desc' },
        ],
        description: 'Order direction',
      },
      {
        displayName: 'Updated Since',
        name: 'updated_since',
        type: 'dateTime',
        default: '',
        description: 'Return tickets updated since this date',
      },
    ],
  },

  // ----------------------------------
  //         ticket:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'CC Emails',
        name: 'cc_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list of CC emails',
      },
      {
        displayName: 'Custom Fields',
        name: 'custom_fields',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'field',
            displayName: 'Field',
            values: [
              {
                displayName: 'Field Name',
                name: 'name',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Field Value',
                name: 'value',
                type: 'string',
                default: '',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 5 },
        default: '',
        description: 'HTML content of the ticket',
      },
      {
        displayName: 'Due By',
        name: 'due_by',
        type: 'dateTime',
        default: '',
      },
      {
        displayName: 'Group Name or ID',
        name: 'group_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getGroups' },
        default: '',
        description: 'ID of the group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Priority',
        name: 'priority',
        type: 'options',
        default: 1,
        options: [
          { name: 'Low', value: 1 },
          { name: 'Medium', value: 2 },
          { name: 'High', value: 3 },
          { name: 'Urgent', value: 4 },
        ],
      },
      {
        displayName: 'Product Name or ID',
        name: 'product_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getProducts' },
        default: '',
        description: 'ID of the product. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Responder Name or ID',
        name: 'responder_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getAgents' },
        default: '',
        description: 'ID of the agent. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Source',
        name: 'source',
        type: 'options',
        default: 2,
        options: [
          { name: 'Email', value: 1 },
          { name: 'Portal', value: 2 },
          { name: 'Phone', value: 3 },
          { name: 'Chat', value: 7 },
          { name: 'Feedback Widget', value: 9 },
          { name: 'Outbound Email', value: 10 },
        ],
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        default: 2,
        options: [
          { name: 'Open', value: 2 },
          { name: 'Pending', value: 3 },
          { name: 'Resolved', value: 4 },
          { name: 'Closed', value: 5 },
        ],
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'string',
        default: '',
      },
    ],
  },

  // ----------------------------------
  //         ticket:search
  // ----------------------------------
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['search'],
      },
    },
    description: 'Search query (e.g., "status:2 AND priority:3")',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['search'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: { minValue: 1 },
    default: 50,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['search'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         ticket:filter
  // ----------------------------------
  {
    displayName: 'Filter Name or ID',
    name: 'filterId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTicketFilters',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['filter'],
      },
    },
    description: 'Select a predefined ticket filter. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['filter'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: { minValue: 1 },
    default: 50,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['filter'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         ticket:reply
  // ----------------------------------
  {
    displayName: 'Body',
    name: 'body',
    type: 'string',
    typeOptions: { rows: 5 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['reply'],
      },
    },
    description: 'HTML content of the reply',
  },
  {
    displayName: 'Reply Options',
    name: 'replyOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['reply'],
      },
    },
    options: [
      {
        displayName: 'BCC Emails',
        name: 'bcc_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list of BCC emails',
      },
      {
        displayName: 'CC Emails',
        name: 'cc_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list of CC emails',
      },
      {
        displayName: 'From Email',
        name: 'from_email',
        type: 'string',
        default: '',
        description: 'Email address to send the reply from',
      },
    ],
  },

  // ----------------------------------
  //         ticket:addNote
  // ----------------------------------
  {
    displayName: 'Note Body',
    name: 'noteBody',
    type: 'string',
    typeOptions: { rows: 5 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['addNote'],
      },
    },
    description: 'HTML content of the note',
  },
  {
    displayName: 'Private',
    name: 'private',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['addNote'],
      },
    },
    description: 'Whether the note is private',
  },
  {
    displayName: 'Notify Emails',
    name: 'notifyEmails',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['addNote'],
      },
    },
    description: 'Comma-separated list of emails to notify',
  },

  // ----------------------------------
  //         ticket:addWatcher
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['addWatcher'],
      },
    },
    description: 'ID of the user to add as watcher',
  },

  // ----------------------------------
  //         ticket:merge
  // ----------------------------------
  {
    displayName: 'Secondary Ticket IDs',
    name: 'secondaryTicketIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['merge'],
      },
    },
    description: 'Comma-separated list of ticket IDs to merge into the primary ticket',
  },
];
