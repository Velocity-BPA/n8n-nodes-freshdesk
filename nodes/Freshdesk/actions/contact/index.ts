/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['contact'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new contact',
        action: 'Create a contact',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a contact',
        action: 'Delete a contact',
      },
      {
        name: 'Filter',
        value: 'filter',
        description: 'Filter contacts',
        action: 'Filter contacts',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a contact by ID',
        action: 'Get a contact',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many contacts',
        action: 'Get many contacts',
      },
      {
        name: 'Make Agent',
        value: 'makeAgent',
        description: 'Convert a contact to an agent',
        action: 'Convert contact to agent',
      },
      {
        name: 'Merge',
        value: 'merge',
        description: 'Merge contacts',
        action: 'Merge contacts',
      },
      {
        name: 'Restore',
        value: 'restore',
        description: 'Restore a deleted contact',
        action: 'Restore a contact',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search contacts',
        action: 'Search contacts',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a contact',
        action: 'Update a contact',
      },
    ],
    default: 'create',
  },
];

export const contactFields: INodeProperties[] = [
  // ----------------------------------
  //         contact:create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'Name of the contact',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'Primary email of the contact',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: 'Address of the contact',
      },
      {
        displayName: 'Company Name or ID',
        name: 'company_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getCompanies',
        },
        default: '',
        description: 'ID of the company. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        typeOptions: { rows: 3 },
        default: '',
        description: 'Description of the contact',
      },
      {
        displayName: 'Job Title',
        name: 'job_title',
        type: 'string',
        default: '',
        description: 'Job title of the contact',
      },
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: '',
        description: 'Language of the contact',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'string',
        default: '',
        description: 'Mobile number of the contact',
      },
      {
        displayName: 'Other Emails',
        name: 'other_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list of additional emails',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number of the contact',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
      },
      {
        displayName: 'Time Zone',
        name: 'time_zone',
        type: 'string',
        default: '',
        description: 'Time zone of the contact',
      },
      {
        displayName: 'Twitter ID',
        name: 'twitter_id',
        type: 'string',
        default: '',
        description: 'Twitter handle of the contact',
      },
      {
        displayName: 'Unique External ID',
        name: 'unique_external_id',
        type: 'string',
        default: '',
        description: 'External ID for the contact',
      },
      {
        displayName: 'View All Tickets',
        name: 'view_all_tickets',
        type: 'boolean',
        default: false,
        description: 'Whether the contact can view all tickets from their company',
      },
    ],
  },

  // ----------------------------------
  //         contact:get
  // ----------------------------------
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['get', 'update', 'delete', 'restore', 'makeAgent'],
      },
    },
    description: 'ID of the contact',
  },

  // ----------------------------------
  //         contact:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contact'],
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
        resource: ['contact'],
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
        resource: ['contact'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Company Name or ID',
        name: 'company_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getCompanies',
        },
        default: '',
        description: 'Filter by company. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Filter by email',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'string',
        default: '',
        description: 'Filter by mobile',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Filter by phone',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'options',
        default: '',
        options: [
          { name: 'Blocked', value: 'blocked' },
          { name: 'Deleted', value: 'deleted' },
          { name: 'Unverified', value: 'unverified' },
          { name: 'Verified', value: 'verified' },
        ],
        description: 'Filter by state',
      },
      {
        displayName: 'Updated Since',
        name: 'updated_since',
        type: 'dateTime',
        default: '',
        description: 'Return contacts updated since this date',
      },
    ],
  },

  // ----------------------------------
  //         contact:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Company Name or ID',
        name: 'company_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getCompanies' },
        default: '',
        description: 'ID of the company. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Custom Fields',
        name: 'custom_fields',
        type: 'fixedCollection',
        typeOptions: { multipleValues: true },
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
        typeOptions: { rows: 3 },
        default: '',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Job Title',
        name: 'job_title',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Other Emails',
        name: 'other_emails',
        type: 'string',
        default: '',
        description: 'Comma-separated list',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list',
      },
      {
        displayName: 'Time Zone',
        name: 'time_zone',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Twitter ID',
        name: 'twitter_id',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Unique External ID',
        name: 'unique_external_id',
        type: 'string',
        default: '',
      },
      {
        displayName: 'View All Tickets',
        name: 'view_all_tickets',
        type: 'boolean',
        default: false,
      },
    ],
  },

  // ----------------------------------
  //         contact:search
  // ----------------------------------
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['search'],
      },
    },
    description: 'Search query (e.g., "email:john@example.com")',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contact'],
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
        resource: ['contact'],
        operation: ['search'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         contact:filter
  // ----------------------------------
  {
    displayName: 'Filter Name or ID',
    name: 'filterId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getContactFilters',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['filter'],
      },
    },
    description: 'Select a predefined contact filter. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contact'],
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
        resource: ['contact'],
        operation: ['filter'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         contact:merge
  // ----------------------------------
  {
    displayName: 'Primary Contact ID',
    name: 'primaryContactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['merge'],
      },
    },
    description: 'ID of the primary contact to merge into',
  },
  {
    displayName: 'Secondary Contact IDs',
    name: 'secondaryContactIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['merge'],
      },
    },
    description: 'Comma-separated list of contact IDs to merge into the primary contact',
  },

  // ----------------------------------
  //         contact:makeAgent
  // ----------------------------------
  {
    displayName: 'Agent Options',
    name: 'agentOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['makeAgent'],
      },
    },
    options: [
      {
        displayName: 'Occasional',
        name: 'occasional',
        type: 'boolean',
        default: false,
        description: 'Whether the agent is an occasional agent',
      },
      {
        displayName: 'Role IDs',
        name: 'role_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of role IDs',
      },
      {
        displayName: 'Ticket Scope',
        name: 'ticket_scope',
        type: 'options',
        default: 1,
        options: [
          { name: 'All Tickets', value: 1 },
          { name: 'Group Tickets', value: 2 },
          { name: 'Restricted Tickets', value: 3 },
        ],
        description: 'Ticket scope for the agent',
      },
    ],
  },
];
