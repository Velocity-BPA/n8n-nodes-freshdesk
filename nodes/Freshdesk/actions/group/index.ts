/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['group'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new group',
        action: 'Create a group',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a group',
        action: 'Delete a group',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a group by ID',
        action: 'Get a group',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many groups',
        action: 'Get many groups',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a group',
        action: 'Update a group',
      },
    ],
    default: 'create',
  },
];

export const groupFields: INodeProperties[] = [
  // ----------------------------------
  //         group:create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['create'],
      },
    },
    description: 'Name of the group',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Agent IDs',
        name: 'agent_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of agent IDs',
      },
      {
        displayName: 'Auto Ticket Assign',
        name: 'auto_ticket_assign',
        type: 'options',
        default: 0,
        options: [
          { name: 'Disabled', value: 0 },
          { name: 'Enabled', value: 1 },
        ],
        description: 'Whether to enable auto ticket assignment',
      },
      {
        displayName: 'Business Hour ID',
        name: 'business_hour_id',
        type: 'number',
        default: 0,
        description: 'ID of the business hour',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Description of the group',
      },
      {
        displayName: 'Escalate To',
        name: 'escalate_to',
        type: 'number',
        default: 0,
        description: 'ID of the agent to escalate tickets to',
      },
      {
        displayName: 'Unassigned For',
        name: 'unassigned_for',
        type: 'string',
        default: '',
        description: 'Time after which tickets are considered unassigned (e.g., "30m")',
      },
    ],
  },

  // ----------------------------------
  //         group:get
  // ----------------------------------
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the group',
  },

  // ----------------------------------
  //         group:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['group'],
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
        resource: ['group'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         group:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Agent IDs',
        name: 'agent_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of agent IDs',
      },
      {
        displayName: 'Auto Ticket Assign',
        name: 'auto_ticket_assign',
        type: 'options',
        default: 0,
        options: [
          { name: 'Disabled', value: 0 },
          { name: 'Enabled', value: 1 },
        ],
      },
      {
        displayName: 'Business Hour ID',
        name: 'business_hour_id',
        type: 'number',
        default: 0,
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
      },
      {
        displayName: 'Escalate To',
        name: 'escalate_to',
        type: 'number',
        default: 0,
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Unassigned For',
        name: 'unassigned_for',
        type: 'string',
        default: '',
      },
    ],
  },
];
