/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class FreshdeskApi implements ICredentialType {
  name = 'freshdeskApi';
  displayName = 'Freshdesk API';
  documentationUrl = 'https://developers.freshdesk.com/api/';

  properties: INodeProperties[] = [
    {
      displayName: 'Domain',
      name: 'domain',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'yourcompany',
      description:
        'Your Freshdesk subdomain (e.g., "yourcompany" from yourcompany.freshdesk.com)',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description:
        'Your Freshdesk API key. Find it in Profile Settings → Your API Key.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.apiKey}}',
        password: 'X',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '=https://{{$credentials.domain}}.freshdesk.com/api/v2',
      url: '/agents/me',
      method: 'GET',
    },
  };
}
