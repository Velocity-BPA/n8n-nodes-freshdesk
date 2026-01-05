/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { IDataObject } from 'n8n-workflow';

// Ticket types
export interface ITicket extends IDataObject {
  id?: number;
  subject?: string;
  description?: string;
  description_text?: string;
  email?: string;
  requester_id?: number;
  responder_id?: number;
  group_id?: number;
  company_id?: number;
  product_id?: number;
  priority?: TicketPriority;
  status?: TicketStatus;
  source?: TicketSource;
  type?: string;
  tags?: string[];
  cc_emails?: string[];
  custom_fields?: IDataObject;
  attachments?: IDataObject[];
  created_at?: string;
  updated_at?: string;
  due_by?: string;
  fr_due_by?: string;
  is_escalated?: boolean;
  spam?: boolean;
  deleted?: boolean;
}

export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export enum TicketStatus {
  Open = 2,
  Pending = 3,
  Resolved = 4,
  Closed = 5,
}

export enum TicketSource {
  Email = 1,
  Portal = 2,
  Phone = 3,
  Chat = 7,
  Feedback = 9,
  Outbound = 10,
}

// Contact types
export interface IContact extends IDataObject {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  company_id?: number;
  unique_external_id?: string;
  twitter_id?: string;
  other_emails?: string[];
  other_companies?: IDataObject[];
  custom_fields?: IDataObject;
  active?: boolean;
  deleted?: boolean;
  view_all_tickets?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Company types
export interface ICompany extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  domains?: string[];
  health_score?: string;
  account_tier?: string;
  industry?: string;
  renewal_date?: string;
  custom_fields?: IDataObject;
  created_at?: string;
  updated_at?: string;
}

// Agent types
export interface IAgent extends IDataObject {
  id?: number;
  email?: string;
  name?: string;
  active?: boolean;
  occasional?: boolean;
  signature?: string;
  ticket_scope?: AgentTicketScope;
  role_ids?: number[];
  group_ids?: number[];
  contact?: IContact;
  created_at?: string;
  updated_at?: string;
}

export enum AgentTicketScope {
  AllTickets = 1,
  GroupTickets = 2,
  RestrictedTickets = 3,
}

// Group types
export interface IGroup extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  agent_ids?: number[];
  escalate_to?: number;
  auto_ticket_assign?: AutoTicketAssign;
  unassigned_for?: string;
  business_hour_id?: number;
  created_at?: string;
  updated_at?: string;
}

export enum AutoTicketAssign {
  Disabled = 0,
  Enabled = 1,
}

// Conversation types
export interface IConversation extends IDataObject {
  id?: number;
  ticket_id?: number;
  user_id?: number;
  body?: string;
  body_text?: string;
  incoming?: boolean;
  private?: boolean;
  source?: number;
  from_email?: string;
  to_emails?: string[];
  cc_emails?: string[];
  bcc_emails?: string[];
  attachments?: IDataObject[];
  created_at?: string;
  updated_at?: string;
}

// Canned Response types
export interface ICannedResponse extends IDataObject {
  id?: number;
  title?: string;
  content?: string;
  content_html?: string;
  folder_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ICannedResponseFolder extends IDataObject {
  id?: number;
  name?: string;
  canned_responses_count?: number;
  created_at?: string;
  updated_at?: string;
}

// Solution (Knowledge Base) types
export interface ISolutionCategory extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  visible_in_portals?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface ISolutionFolder extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  category_id?: number;
  visibility?: FolderVisibility;
  company_ids?: number[];
  contact_segment_ids?: number[];
  created_at?: string;
  updated_at?: string;
}

export enum FolderVisibility {
  AllUsers = 1,
  LoggedInUsers = 2,
  Agents = 3,
  SelectedCompanies = 4,
}

export interface ISolutionArticle extends IDataObject {
  id?: number;
  title?: string;
  description?: string;
  description_text?: string;
  folder_id?: number;
  category_id?: number;
  status?: ArticleStatus;
  seo_data?: IDataObject;
  tags?: string[];
  views?: number;
  thumbs_up?: number;
  thumbs_down?: number;
  created_at?: string;
  updated_at?: string;
}

export enum ArticleStatus {
  Draft = 1,
  Published = 2,
}

// Time Entry types
export interface ITimeEntry extends IDataObject {
  id?: number;
  ticket_id?: number;
  agent_id?: number;
  time_spent?: string;
  billable?: boolean;
  note?: string;
  timer_running?: boolean;
  start_time?: string;
  executed_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Product types
export interface IProduct extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  primary_email?: string;
  created_at?: string;
  updated_at?: string;
}

// API Response types
export interface IFreshdeskResponse<T> {
  data?: T;
  total?: number;
  results?: T[];
}

// Webhook types
export interface IWebhook extends IDataObject {
  id?: number;
  name?: string;
  description?: string;
  event?: string;
  url?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Request options
export interface IFreshdeskRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: IDataObject;
  qs?: IDataObject;
  headers?: IDataObject;
}

// Pagination
export interface IPaginationOptions {
  page?: number;
  per_page?: number;
}

// Filter types
export interface IFilterOptions extends IDataObject {
  query?: string;
  filter?: string;
  order_by?: string;
  order_type?: 'asc' | 'desc';
  include?: string;
}

// Resource types
export type FreshdeskResource =
  | 'ticket'
  | 'contact'
  | 'company'
  | 'agent'
  | 'group'
  | 'conversation'
  | 'cannedResponse'
  | 'solution'
  | 'timeEntry'
  | 'product';

// Operation types by resource
export type TicketOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'restore'
  | 'search'
  | 'filter'
  | 'reply'
  | 'addNote'
  | 'getConversations'
  | 'addWatcher'
  | 'merge';

export type ContactOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'restore'
  | 'merge'
  | 'makeAgent'
  | 'search'
  | 'filter';

export type CompanyOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'search'
  | 'filter';

export type AgentOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'filter';

export type GroupOperation = 'create' | 'get' | 'getAll' | 'update' | 'delete';

export type ConversationOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete';

export type CannedResponseOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'getFolders';

export type SolutionOperation =
  | 'createCategory'
  | 'createFolder'
  | 'createArticle'
  | 'getArticle'
  | 'getAllArticles'
  | 'updateArticle'
  | 'deleteArticle'
  | 'translateArticle';

export type TimeEntryOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete'
  | 'toggleTimer';

export type ProductOperation =
  | 'create'
  | 'get'
  | 'getAll'
  | 'update'
  | 'delete';
