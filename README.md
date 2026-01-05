# n8n-nodes-freshdesk

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Freshdesk providing 10 resources and 60+ operations for ticket management, customer support, and knowledge base automation.

![n8n](https://img.shields.io/badge/n8n-community--node-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **Complete Ticket Management** - Create, update, search, filter, merge, and manage tickets with full conversation support
- **Contact & Company Management** - Full CRUD operations with merge, search, and filter capabilities
- **Agent & Group Administration** - Manage support agents, roles, and team groups
- **Knowledge Base (Solutions)** - Create and manage categories, folders, articles, and translations
- **Canned Responses** - Manage response templates for faster replies
- **Time Tracking** - Log and manage time entries with timer functionality
- **Product Management** - Organize tickets by product or service
- **Webhook Triggers** - Automate workflows based on Freshdesk events
- **Rate Limit Handling** - Automatic retry logic with Retry-After header support
- **Pagination Support** - Efficiently retrieve large datasets

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-freshdesk` and click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node package
npm install n8n-nodes-freshdesk
```

### Development Installation

```bash
# 1. Extract/clone the repository
cd n8n-nodes-freshdesk

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Create symlink to n8n custom nodes directory
# For Linux/macOS:
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-freshdesk

# For Windows (run as Administrator):
# mklink /D %USERPROFILE%\.n8n\custom\n8n-nodes-freshdesk %CD%

# 5. Restart n8n
n8n start
```

## Credentials Setup

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| Domain | String | Yes | Your Freshdesk subdomain (e.g., `yourcompany` from `yourcompany.freshdesk.com`) |
| API Key | String | Yes | Your Freshdesk API key (found in Profile Settings) |

### Getting Your API Key

1. Log in to your Freshdesk account
2. Click your profile picture in the top right
3. Go to **Profile Settings**
4. Your API Key is displayed on the right sidebar

## Resources & Operations

### Tickets
| Operation | Description |
|-----------|-------------|
| Create | Create a new ticket |
| Get | Get a ticket by ID |
| Get Many | List all tickets with optional filters |
| Update | Update ticket properties |
| Delete | Delete a ticket |
| Restore | Restore a deleted ticket |
| Search | Search tickets using query |
| Filter | Filter tickets using saved filters |
| Reply | Add a reply to a ticket |
| Add Note | Add a private note |
| Get Conversations | List all conversations |
| Add Watcher | Add a watcher to a ticket |
| Merge | Merge multiple tickets |

### Contacts
| Operation | Description |
|-----------|-------------|
| Create | Create a new contact |
| Get | Get a contact by ID |
| Get Many | List all contacts |
| Update | Update contact properties |
| Delete | Delete a contact |
| Restore | Restore a deleted contact |
| Merge | Merge multiple contacts |
| Make Agent | Convert contact to agent |
| Search | Search contacts |
| Filter | Filter contacts |

### Companies
| Operation | Description |
|-----------|-------------|
| Create | Create a new company |
| Get | Get a company by ID |
| Get Many | List all companies |
| Update | Update company properties |
| Delete | Delete a company |
| Search | Search companies |
| Filter | Filter companies |

### Agents
| Operation | Description |
|-----------|-------------|
| Create | Create a new agent |
| Get | Get an agent by ID |
| Get Many | List all agents |
| Update | Update agent properties |
| Delete | Deactivate an agent |
| Filter | Filter agents |

### Groups
| Operation | Description |
|-----------|-------------|
| Create | Create a new group |
| Get | Get a group by ID |
| Get Many | List all groups |
| Update | Update group properties |
| Delete | Delete a group |

### Conversations
| Operation | Description |
|-----------|-------------|
| Create | Create a reply or note |
| Get Many | List ticket conversations |
| Update | Update a note |
| Delete | Delete a conversation |

### Canned Responses
| Operation | Description |
|-----------|-------------|
| Create | Create a canned response |
| Get | Get a canned response |
| Get Many | List canned responses |
| Update | Update a canned response |
| Delete | Delete a canned response |
| Get Folders | List response folders |

### Solutions (Knowledge Base)
| Operation | Description |
|-----------|-------------|
| Create Category | Create a new category |
| Create Folder | Create a new folder |
| Create Article | Create a new article |
| Get Article | Get an article by ID |
| Get Many Articles | List articles in a folder |
| Update Article | Update an article |
| Delete Article | Delete an article |
| Translate Article | Add article translation |

### Time Entries
| Operation | Description |
|-----------|-------------|
| Create | Create a time entry |
| Get | Get a time entry |
| Get Many | List time entries |
| Update | Update a time entry |
| Delete | Delete a time entry |
| Toggle Timer | Start/stop timer |

### Products
| Operation | Description |
|-----------|-------------|
| Create | Create a new product |
| Get | Get a product by ID |
| Get Many | List all products |
| Update | Update a product |
| Delete | Delete a product |

## Trigger Node

The Freshdesk Trigger node allows you to start workflows based on Freshdesk events.

### Supported Events

- Ticket Created
- Ticket Updated
- Ticket Deleted
- Note Added
- Reply Received
- Agent Assigned
- Status Changed
- Priority Changed
- All Events

### Webhook Setup

1. Copy the webhook URL from n8n
2. In Freshdesk, go to **Admin** > **Automations** > **Automation Rules**
3. Create a new rule with your trigger conditions
4. Add action: **Trigger Webhook**
5. Paste the webhook URL
6. Select POST method and JSON content type
7. Configure the payload with ticket/conversation data

## Usage Examples

### Create a Ticket

```javascript
// Node: Freshdesk
// Operation: Create Ticket

{
  "subject": "Issue with login",
  "description": "User cannot access their account",
  "email": "customer@example.com",
  "priority": 3,  // High
  "status": 2     // Open
}
```

### Search Tickets

```javascript
// Node: Freshdesk
// Operation: Search

{
  "query": "status:2 AND priority:3"
}
```

### Add Reply to Ticket

```javascript
// Node: Freshdesk
// Operation: Reply

{
  "ticketId": 12345,
  "body": "<p>Thank you for contacting us. We're looking into this.</p>"
}
```

## Error Handling

The node includes built-in error handling for:

- **Rate Limiting (429)** - Automatically extracts Retry-After header
- **Authentication Errors** - Clear messaging for credential issues
- **API Errors** - Detailed error messages from Freshdesk API

## Security Best Practices

1. **Store API keys securely** - Use n8n's credentials system
2. **Use environment variables** - For domain configuration
3. **Limit API key permissions** - Use keys with minimum required scope
4. **Monitor API usage** - Track rate limits and usage patterns

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## Support

- **Documentation**: [Freshdesk API v2](https://developers.freshdesk.com/api/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-freshdesk/issues)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## Acknowledgments

- [Freshdesk](https://freshdesk.com) for their comprehensive API
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for their contributions and feedback
