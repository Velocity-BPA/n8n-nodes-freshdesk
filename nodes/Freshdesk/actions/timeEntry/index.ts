/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const timeEntryOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a time entry for a ticket',
        action: 'Create a time entry',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a time entry',
        action: 'Delete a time entry',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a time entry by ID',
        action: 'Get a time entry',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get all time entries for a ticket',
        action: 'Get many time entries',
      },
      {
        name: 'Toggle Timer',
        value: 'toggleTimer',
        description: 'Start or stop a timer',
        action: 'Toggle timer',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a time entry',
        action: 'Update a time entry',
      },
    ],
    default: 'create',
  },
];

export const timeEntryFields: INodeProperties[] = [
  // ----------------------------------
  //         timeEntry:create
  // ----------------------------------
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create', 'getAll'],
      },
    },
    description: 'ID of the ticket',
  },
  {
    displayName: 'Time Spent',
    name: 'timeSpent',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create'],
      },
    },
    placeholder: '01:30',
    description: 'Time spent in HH:MM format',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Agent Name or ID',
        name: 'agent_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getAgents',
        },
        default: '',
        description: 'ID of the agent. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Billable',
        name: 'billable',
        type: 'boolean',
        default: true,
        description: 'Whether the time entry is billable',
      },
      {
        displayName: 'Executed At',
        name: 'executed_at',
        type: 'dateTime',
        default: '',
        description: 'When the work was performed',
      },
      {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Note about the time entry',
      },
      {
        displayName: 'Start Time',
        name: 'start_time',
        type: 'dateTime',
        default: '',
        description: 'Start time of the work',
      },
    ],
  },

  // ----------------------------------
  //         timeEntry:get
  // ----------------------------------
  {
    displayName: 'Time Entry ID',
    name: 'timeEntryId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['get', 'update', 'delete', 'toggleTimer'],
      },
    },
    description: 'ID of the time entry',
  },

  // ----------------------------------
  //         timeEntry:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
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
        resource: ['timeEntry'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         timeEntry:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Agent Name or ID',
        name: 'agent_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getAgents' },
        default: '',
        description: 'ID of the agent. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Billable',
        name: 'billable',
        type: 'boolean',
        default: true,
      },
      {
        displayName: 'Executed At',
        name: 'executed_at',
        type: 'dateTime',
        default: '',
      },
      {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
      },
      {
        displayName: 'Start Time',
        name: 'start_time',
        type: 'dateTime',
        default: '',
      },
      {
        displayName: 'Time Spent',
        name: 'time_spent',
        type: 'string',
        default: '',
        placeholder: '01:30',
        description: 'Time spent in HH:MM format',
      },
    ],
  },
];
