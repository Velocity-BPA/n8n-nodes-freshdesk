/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['product'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new product',
        action: 'Create a product',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a product',
        action: 'Delete a product',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a product by ID',
        action: 'Get a product',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get many products',
        action: 'Get many products',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a product',
        action: 'Update a product',
      },
    ],
    default: 'getAll',
  },
];

export const productFields: INodeProperties[] = [
  // ----------------------------------
  //         product:create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Name of the product',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Description of the product',
      },
      {
        displayName: 'Primary Email',
        name: 'primary_email',
        type: 'string',
        placeholder: 'support@example.com',
        default: '',
        description: 'Primary support email for the product',
      },
    ],
  },

  // ----------------------------------
  //         product:get
  // ----------------------------------
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the product',
  },

  // ----------------------------------
  //         product:getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['product'],
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
        resource: ['product'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         product:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Primary Email',
        name: 'primary_email',
        type: 'string',
        placeholder: 'support@example.com',
        default: '',
      },
    ],
  },
];
