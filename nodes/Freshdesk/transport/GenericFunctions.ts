/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  IRequestOptions,
  IWebhookFunctions,
  JsonObject,
  NodeApiError,
  NodeOperationError,
} from 'n8n-workflow';

/**
 * Make an API request to Freshdesk
 */
export async function freshdeskApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
  const credentials = await this.getCredentials('freshdeskApi');

  if (!credentials.domain) {
    throw new NodeOperationError(this.getNode(), 'Missing Freshdesk domain in credentials');
  }

  const requestOptions: IRequestOptions = {
    method,
    uri: `https://${credentials.domain}.freshdesk.com/api/v2${endpoint}`,
    auth: {
      user: credentials.apiKey as string,
      pass: 'X',
    },
    headers: {
      'Content-Type': 'application/json',
    },
    qs,
    body,
    json: true,
  };

  // Remove body for GET/DELETE requests
  if (method === 'GET' || method === 'DELETE') {
    delete requestOptions.body;
  }

  // Remove empty objects
  if (Object.keys(qs).length === 0) {
    delete requestOptions.qs;
  }

  if (Object.keys(body).length === 0) {
    delete requestOptions.body;
  }

  try {
    const response = await this.helpers.request(requestOptions);
    return response as IDataObject | IDataObject[];
  } catch (error: unknown) {
    const err = error as { statusCode?: number; response?: { headers?: { 'retry-after'?: string } }; message?: string };
    // Handle rate limiting
    if (err.statusCode === 429) {
      const retryAfter = err.response?.headers?.['retry-after'] || '60';
      throw new NodeApiError(this.getNode(), { message: err.message } as JsonObject, {
        message: `Rate limit exceeded. Retry after ${retryAfter} seconds.`,
        httpCode: '429',
      });
    }

    throw new NodeApiError(this.getNode(), { message: (error as Error).message } as JsonObject);
  }
}

/**
 * Make an API request to Freshdesk and return all results
 */
export async function freshdeskApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  limit = 0,
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const perPage = 100;
  let responseData: IDataObject[];

  do {
    const queryParams: IDataObject = {
      ...qs,
      page,
      per_page: perPage,
    };

    responseData = (await freshdeskApiRequest.call(this, method, endpoint, body, queryParams)) as IDataObject[];

    if (!Array.isArray(responseData)) {
      break;
    }

    returnData.push(...responseData);
    page++;

    // Check if we've hit the limit
    if (limit > 0 && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }
  } while (responseData.length === perPage);

  return returnData;
}

/**
 * Make a search request to Freshdesk
 * Note: Freshdesk search is limited to 30 results per page and 10 pages max (300 results total)
 */
export async function freshdeskSearchRequest(
  this: IExecuteFunctions,
  resource: string,
  query: string,
  limit = 0,
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const maxPages = 10; // Freshdesk search limit

  do {
    const qs: IDataObject = {
      query: `"${query}"`,
      page,
    };

    const response = (await freshdeskApiRequest.call(this, 'GET', `/search/${resource}`, {}, qs)) as IDataObject;
    const results = (response.results as IDataObject[]) || [];

    if (results.length === 0) {
      break;
    }

    returnData.push(...results);
    page++;

    // Check if we've hit the limit
    if (limit > 0 && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }
  } while (page <= maxPages);

  return returnData;
}

/**
 * Make a filter request to Freshdesk
 */
export async function freshdeskFilterRequest(
  this: IExecuteFunctions,
  resource: string,
  filterId: number,
  limit = 0,
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const perPage = 30;

  do {
    const qs: IDataObject = {
      page,
      per_page: perPage,
    };

    const endpoint = resource === 'tickets' 
      ? `/tickets/filter?filter_id=${filterId}` 
      : `/${resource}?filter_id=${filterId}`;

    const responseData = (await freshdeskApiRequest.call(this, 'GET', endpoint, {}, qs)) as IDataObject[];

    if (!Array.isArray(responseData) || responseData.length === 0) {
      break;
    }

    returnData.push(...responseData);
    page++;

    // Check if we've hit the limit
    if (limit > 0 && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }
  } while (true);

  return returnData;
}

/**
 * Make an API request with attachments (multipart form data)
 */
export async function freshdeskApiRequestWithAttachments(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  attachments: Array<{ fieldName: string; fileName: string; data: Buffer; contentType?: string }> = [],
): Promise<IDataObject> {
  const credentials = await this.getCredentials('freshdeskApi');

  if (!credentials.domain) {
    throw new NodeOperationError(this.getNode(), 'Missing Freshdesk domain in credentials');
  }

  const formData: IDataObject = {};

  // Add body fields to form data
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        formData[key] = JSON.stringify(value);
      } else if (Array.isArray(value)) {
        // Handle arrays (e.g., cc_emails)
        value.forEach((v, index) => {
          formData[`${key}[${index}]`] = v;
        });
      } else {
        formData[key] = value;
      }
    }
  }

  // Add attachments
  for (const attachment of attachments) {
    if (attachment.data) {
      formData[attachment.fieldName] = {
        value: attachment.data,
        options: {
          filename: attachment.fileName,
          contentType: attachment.contentType || 'application/octet-stream',
        },
      };
    }
  }

  const requestOptions: IRequestOptions = {
    method,
    uri: `https://${credentials.domain}.freshdesk.com/api/v2${endpoint}`,
    auth: {
      user: credentials.apiKey as string,
      pass: 'X',
    },
    formData,
    json: true,
  };

  try {
    const response = await this.helpers.request(requestOptions);
    return response as IDataObject;
  } catch (error: unknown) {
    throw new NodeApiError(this.getNode(), { message: (error as Error).message } as JsonObject);
  }
}

/**
 * Parse custom fields from n8n UI format to Freshdesk format
 */
export function parseCustomFields(customFields: IDataObject): IDataObject {
  const result: IDataObject = {};

  for (const [key, value] of Object.entries(customFields)) {
    // Custom field names in Freshdesk should start with 'cf_'
    const fieldName = key.startsWith('cf_') ? key : `cf_${key}`;
    result[fieldName] = value;
  }

  return result;
}

/**
 * Format include parameter for API requests
 */
export function formatIncludeParameter(includes: string[]): string {
  return includes.filter((i) => i).join(',');
}

/**
 * Build search query string
 */
export function buildSearchQuery(filters: IDataObject): string {
  const queryParts: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'string' && value.includes(' ')) {
        queryParts.push(`${key}:'${value}'`);
      } else {
        queryParts.push(`${key}:${value}`);
      }
    }
  }

  return queryParts.join(' AND ');
}

/**
 * Clean request body by removing undefined/null/empty values
 */
export function cleanRequestBody(body: IDataObject): IDataObject {
  const cleaned: IDataObject = {};

  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedCleaned = cleanRequestBody(value as IDataObject);
        if (Object.keys(nestedCleaned).length > 0) {
          cleaned[key] = nestedCleaned;
        }
      } else {
        cleaned[key] = value;
      }
    }
  }

  return cleaned;
}

/**
 * Format time spent string to Freshdesk format (HH:MM)
 */
export function formatTimeSpent(timeSpent: string): string {
  // If already in HH:MM format, return as-is
  if (/^\d{1,2}:\d{2}$/.test(timeSpent)) {
    return timeSpent;
  }

  // Try to parse minutes
  const minutes = parseInt(timeSpent, 10);
  if (!isNaN(minutes)) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  }

  return timeSpent;
}

/**
 * Get load options helper
 */
export async function getLoadOptions(
  context: ILoadOptionsFunctions,
  endpoint: string,
  nameField = 'name',
  valueField = 'id',
): Promise<Array<{ name: string; value: number | string }>> {
  const items = (await freshdeskApiRequestAllItems.call(context, 'GET', endpoint)) as IDataObject[];

  return items.map((item) => ({
    name: (item[nameField] as string) || `Item ${item[valueField]}`,
    value: item[valueField] as number | string,
  }));
}
