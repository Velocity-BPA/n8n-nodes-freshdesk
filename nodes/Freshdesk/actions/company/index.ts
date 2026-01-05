/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const companyOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['company'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new company',
        action: 'Create a company',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a company',
        action: 'Delete a company',
      },
      {
        name: 'Filter',
        value: 'filter',
        description: 'Filter companies',
        action: 'Filter companies',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a company by ID',
        action: 'Get a company',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many companies',
        action: 'Get many companies',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search companies',
        action: 'Search companies',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a company',
        action: 'Update a company',
      },
    ],
    default: 'create',
  },
];

export const companyFields: INodeProperties[] = [
  // ----------------------------------
  //         company:create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['create'],
      },
    },
    description: 'Name of the company',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Account Tier',
        name: 'account_tier',
        type: 'options',
        default: '',
        options: [
          { name: 'Basic', value: 'Basic' },
          { name: 'Premium', value: 'Premium' },
          { name: 'Enterprise', value: 'Enterprise' },
        ],
        description: 'Account tier of the company',
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
        description: 'Description of the company',
      },
      {
        displayName: 'Domains',
        name: 'domains',
        type: 'string',
        default: '',
        description: 'Comma-separated list of email domains',
      },
      {
        displayName: 'Health Score',
        name: 'health_score',
        type: 'options',
        default: '',
        options: [
          { name: 'At Risk', value: 'At risk' },
          { name: 'Doing Okay', value: 'Doing okay' },
          { name: 'Happy', value: 'Happy' },
        ],
        description: 'Health score of the company',
      },
      {
        displayName: 'Industry',
        name: 'industry',
        type: 'string',
        default: '',
        description: 'Industry of the company',
      },
      {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Notes about the company',
      },
      {
        displayName: 'Renewal Date',
        name: 'renewal_date',
        type: 'dateTime',
        default: '',
        description: 'Renewal date for the company',
      },
    ],
  },

  // ----------------------------------
  //         company:get
  // ----------------------------------
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the company',
  },

  // ----------------------------------
  //         company:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['company'],
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
        resource: ['company'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         company:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Account Tier',
        name: 'account_tier',
        type: 'options',
        default: '',
        options: [
          { name: 'Basic', value: 'Basic' },
          { name: 'Premium', value: 'Premium' },
          { name: 'Enterprise', value: 'Enterprise' },
        ],
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
              { displayName: 'Field Name', name: 'name', type: 'string', default: '' },
              { displayName: 'Field Value', name: 'value', type: 'string', default: '' },
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
        displayName: 'Domains',
        name: 'domains',
        type: 'string',
        default: '',
        description: 'Comma-separated list of email domains',
      },
      {
        displayName: 'Health Score',
        name: 'health_score',
        type: 'options',
        default: '',
        options: [
          { name: 'At Risk', value: 'At risk' },
          { name: 'Doing Okay', value: 'Doing okay' },
          { name: 'Happy', value: 'Happy' },
        ],
      },
      {
        displayName: 'Industry',
        name: 'industry',
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
        displayName: 'Note',
        name: 'note',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
      },
      {
        displayName: 'Renewal Date',
        name: 'renewal_date',
        type: 'dateTime',
        default: '',
      },
    ],
  },

  // ----------------------------------
  //         company:search
  // ----------------------------------
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['search'],
      },
    },
    description: 'Search query (e.g., "name:Acme Corp")',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['company'],
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
        resource: ['company'],
        operation: ['search'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         company:filter
  // ----------------------------------
  {
    displayName: 'Filter Name or ID',
    name: 'filterId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getCompanyFilters',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['company'],
        operation: ['filter'],
      },
    },
    description: 'Select a predefined company filter. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['company'],
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
        resource: ['company'],
        operation: ['filter'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
];
