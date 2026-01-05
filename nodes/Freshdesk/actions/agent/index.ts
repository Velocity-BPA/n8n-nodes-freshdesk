/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const agentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['agent'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new agent',
        action: 'Create an agent',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Deactivate an agent',
        action: 'Deactivate an agent',
      },
      {
        name: 'Filter',
        value: 'filter',
        description: 'Filter agents',
        action: 'Filter agents',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get an agent by ID',
        action: 'Get an agent',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many agents',
        action: 'Get many agents',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an agent',
        action: 'Update an agent',
      },
    ],
    default: 'create',
  },
];

export const agentFields: INodeProperties[] = [
  // ----------------------------------
  //         agent:create
  // ----------------------------------
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    description: 'Email address of the agent',
  },
  {
    displayName: 'Ticket Scope',
    name: 'ticket_scope',
    type: 'options',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'All Tickets', value: 1 },
      { name: 'Group Tickets', value: 2 },
      { name: 'Restricted Tickets', value: 3 },
    ],
    description: 'Ticket scope for the agent',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Group IDs',
        name: 'group_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of group IDs',
      },
      {
        displayName: 'Job Title',
        name: 'job_title',
        type: 'string',
        default: '',
        description: 'Job title of the agent',
      },
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language of the agent',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'string',
        default: '',
        description: 'Mobile number of the agent',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Full name of the agent',
      },
      {
        displayName: 'Occasional',
        name: 'occasional',
        type: 'boolean',
        default: false,
        description: 'Whether the agent is an occasional agent',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number of the agent',
      },
      {
        displayName: 'Role IDs',
        name: 'role_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of role IDs',
      },
      {
        displayName: 'Signature',
        name: 'signature',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Email signature of the agent (HTML)',
      },
      {
        displayName: 'Time Zone',
        name: 'time_zone',
        type: 'string',
        default: '',
        description: 'Time zone of the agent',
      },
    ],
  },

  // ----------------------------------
  //         agent:get
  // ----------------------------------
  {
    displayName: 'Agent ID',
    name: 'agentId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the agent',
  },

  // ----------------------------------
  //         agent:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['agent'],
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
        resource: ['agent'],
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
        resource: ['agent'],
        operation: ['getAll'],
      },
    },
    options: [
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
          { name: 'Full-Time', value: 'fulltime' },
          { name: 'Occasional', value: 'occasional' },
        ],
        description: 'Filter by agent type',
      },
    ],
  },

  // ----------------------------------
  //         agent:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Group IDs',
        name: 'group_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of group IDs',
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
        displayName: 'Occasional',
        name: 'occasional',
        type: 'boolean',
        default: false,
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Role IDs',
        name: 'role_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of role IDs',
      },
      {
        displayName: 'Signature',
        name: 'signature',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
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
      },
      {
        displayName: 'Time Zone',
        name: 'time_zone',
        type: 'string',
        default: '',
      },
    ],
  },

  // ----------------------------------
  //         agent:filter
  // ----------------------------------
  {
    displayName: 'Filter Type',
    name: 'filterType',
    type: 'options',
    required: true,
    default: 'all',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['filter'],
      },
    },
    options: [
      { name: 'All', value: 'all' },
      { name: 'Active', value: 'active' },
      { name: 'Occasional', value: 'occasional' },
    ],
    description: 'Type of agents to filter',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['agent'],
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
        resource: ['agent'],
        operation: ['filter'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
];
