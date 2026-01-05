/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const cannedResponseOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a canned response',
        action: 'Create a canned response',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a canned response',
        action: 'Delete a canned response',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a canned response by ID',
        action: 'Get a canned response',
      },
      {
        name: 'Get Folders',
        value: 'getFolders',
        description: 'Get all canned response folders',
        action: 'Get canned response folders',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many canned responses from a folder',
        action: 'Get many canned responses',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a canned response',
        action: 'Update a canned response',
      },
    ],
    default: 'getAll',
  },
];

export const cannedResponseFields: INodeProperties[] = [
  // ----------------------------------
  //         cannedResponse:create
  // ----------------------------------
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['create'],
      },
    },
    description: 'Title of the canned response',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    typeOptions: { rows: 5 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['create'],
      },
    },
    description: 'HTML content of the canned response',
  },
  {
    displayName: 'Folder Name or ID',
    name: 'folderId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getCannedResponseFolders',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['create', 'getAll'],
      },
    },
    description: 'ID of the folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        default: 0,
        options: [
          { name: 'All Agents', value: 0 },
          { name: 'Personal', value: 1 },
          { name: 'Group', value: 2 },
        ],
        description: 'Visibility of the canned response',
      },
    ],
  },

  // ----------------------------------
  //         cannedResponse:get
  // ----------------------------------
  {
    displayName: 'Canned Response ID',
    name: 'cannedResponseId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the canned response',
  },

  // ----------------------------------
  //         cannedResponse:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['getAll', 'getFolders'],
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
        resource: ['cannedResponse'],
        operation: ['getAll', 'getFolders'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         cannedResponse:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        typeOptions: { rows: 5 },
        default: '',
        description: 'HTML content of the canned response',
      },
      {
        displayName: 'Folder Name or ID',
        name: 'folder_id',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getCannedResponseFolders' },
        default: '',
        description: 'ID of the folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        default: 0,
        options: [
          { name: 'All Agents', value: 0 },
          { name: 'Personal', value: 1 },
          { name: 'Group', value: 2 },
        ],
      },
    ],
  },
];
