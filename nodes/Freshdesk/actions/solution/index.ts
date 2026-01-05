/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const solutionOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['solution'],
      },
    },
    options: [
      {
        name: 'Create Article',
        value: 'createArticle',
        description: 'Create a knowledge base article',
        action: 'Create an article',
      },
      {
        name: 'Create Category',
        value: 'createCategory',
        description: 'Create a knowledge base category',
        action: 'Create a category',
      },
      {
        name: 'Create Folder',
        value: 'createFolder',
        description: 'Create a knowledge base folder',
        action: 'Create a folder',
      },
      {
        name: 'Delete Article',
        value: 'deleteArticle',
        description: 'Delete an article',
        action: 'Delete an article',
      },
      {
        name: 'Get Article',
        value: 'getArticle',
        description: 'Get an article by ID',
        action: 'Get an article',
      },
      {
        name: 'Get Many Articles',
        value: 'getAllArticles',
        description: 'Get all articles from a folder',
        action: 'Get many articles',
      },
      {
        name: 'Translate Article',
        value: 'translateArticle',
        description: 'Add a translation to an article',
        action: 'Translate an article',
      },
      {
        name: 'Update Article',
        value: 'updateArticle',
        description: 'Update an article',
        action: 'Update an article',
      },
    ],
    default: 'getAllArticles',
  },
];

export const solutionFields: INodeProperties[] = [
  // ----------------------------------
  //         solution:createCategory
  // ----------------------------------
  {
    displayName: 'Category Name',
    name: 'categoryName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createCategory'],
      },
    },
    description: 'Name of the category',
  },
  {
    displayName: 'Category Description',
    name: 'categoryDescription',
    type: 'string',
    typeOptions: { rows: 3 },
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createCategory'],
      },
    },
    description: 'Description of the category',
  },

  // ----------------------------------
  //         solution:createFolder
  // ----------------------------------
  {
    displayName: 'Category Name or ID',
    name: 'categoryId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getSolutionCategories',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createFolder', 'getAllArticles'],
      },
    },
    description: 'ID of the category. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Folder Name',
    name: 'folderName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createFolder'],
      },
    },
    description: 'Name of the folder',
  },
  {
    displayName: 'Visibility',
    name: 'visibility',
    type: 'options',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createFolder'],
      },
    },
    options: [
      { name: 'All Users', value: 1 },
      { name: 'Logged-In Users', value: 2 },
      { name: 'Agents', value: 3 },
      { name: 'Selected Companies', value: 4 },
    ],
    description: 'Visibility of the folder',
  },
  {
    displayName: 'Folder Options',
    name: 'folderOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createFolder'],
      },
    },
    options: [
      {
        displayName: 'Company IDs',
        name: 'company_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated list of company IDs (for visibility = Selected Companies)',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        description: 'Description of the folder',
      },
    ],
  },

  // ----------------------------------
  //         solution:createArticle
  // ----------------------------------
  {
    displayName: 'Folder Name or ID',
    name: 'folderId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getSolutionFolders',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createArticle'],
      },
    },
    description: 'ID of the folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createArticle'],
      },
    },
    description: 'Title of the article',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    typeOptions: { rows: 10 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createArticle'],
      },
    },
    description: 'HTML content of the article',
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createArticle'],
      },
    },
    options: [
      { name: 'Draft', value: 1 },
      { name: 'Published', value: 2 },
    ],
    description: 'Status of the article',
  },
  {
    displayName: 'Article Options',
    name: 'articleOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['createArticle'],
      },
    },
    options: [
      {
        displayName: 'SEO Data',
        name: 'seo_data',
        type: 'fixedCollection',
        default: {},
        options: [
          {
            name: 'seo',
            displayName: 'SEO',
            values: [
              {
                displayName: 'Meta Title',
                name: 'meta_title',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Meta Description',
                name: 'meta_description',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Meta Keywords',
                name: 'meta_keywords',
                type: 'string',
                default: '',
                description: 'Comma-separated keywords',
              },
            ],
          },
        ],
        description: 'SEO metadata for the article',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
      },
    ],
  },

  // ----------------------------------
  //         solution:getArticle
  // ----------------------------------
  {
    displayName: 'Article ID',
    name: 'articleId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['getArticle', 'updateArticle', 'deleteArticle', 'translateArticle'],
      },
    },
    description: 'ID of the article',
  },

  // ----------------------------------
  //         solution:getAllArticles
  // ----------------------------------
  {
    displayName: 'Folder Name or ID',
    name: 'folderId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getSolutionFolders',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['getAllArticles'],
      },
    },
    description: 'ID of the folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['getAllArticles'],
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
        resource: ['solution'],
        operation: ['getAllArticles'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //         solution:updateArticle
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['updateArticle'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: { rows: 10 },
        default: '',
        description: 'HTML content of the article',
      },
      {
        displayName: 'SEO Data',
        name: 'seo_data',
        type: 'fixedCollection',
        default: {},
        options: [
          {
            name: 'seo',
            displayName: 'SEO',
            values: [
              { displayName: 'Meta Title', name: 'meta_title', type: 'string', default: '' },
              { displayName: 'Meta Description', name: 'meta_description', type: 'string', default: '' },
              { displayName: 'Meta Keywords', name: 'meta_keywords', type: 'string', default: '' },
            ],
          },
        ],
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        default: 1,
        options: [
          { name: 'Draft', value: 1 },
          { name: 'Published', value: 2 },
        ],
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
      },
    ],
  },

  // ----------------------------------
  //         solution:translateArticle
  // ----------------------------------
  {
    displayName: 'Language Code',
    name: 'languageCode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['translateArticle'],
      },
    },
    placeholder: 'es',
    description: 'Language code for the translation (e.g., "es", "fr", "de")',
  },
  {
    displayName: 'Translated Title',
    name: 'translatedTitle',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['translateArticle'],
      },
    },
    description: 'Title in the target language',
  },
  {
    displayName: 'Translated Description',
    name: 'translatedDescription',
    type: 'string',
    typeOptions: { rows: 10 },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['translateArticle'],
      },
    },
    description: 'Content in the target language (HTML)',
  },
  {
    displayName: 'Translation Status',
    name: 'translationStatus',
    type: 'options',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['solution'],
        operation: ['translateArticle'],
      },
    },
    options: [
      { name: 'Draft', value: 1 },
      { name: 'Published', value: 2 },
    ],
    description: 'Status of the translation',
  },
];
