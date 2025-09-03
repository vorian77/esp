# Notion MCP Server Setup

## Overview
The Notion MCP (Model Context Protocol) server has been successfully installed in this project. It enables AI tools to interact with your Notion workspace through various tools and commands.

## Installation Completed
- ✅ Package installed: `@notionhq/notion-mcp-server` v1.9.0
- ✅ NPM scripts added to package.json
- ✅ Environment configuration prepared

## Quick Setup Instructions

### 1. Create Notion Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "MCP Server")
4. Copy the generated "Internal Integration Token"

### 2. Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and replace `your_notion_integration_token_here` with your actual token

### 3. Share Pages with Integration
1. Go to your Notion workspace
2. Open the page/database you want to access
3. Click "Share" → "Invite" 
4. Search for your integration name and add it

### 4. Run the MCP Server

**Option A: Standard (stdio transport):**
```bash
pnpm run notion-mcp
```

**Option B: HTTP transport:**
```bash
pnpm run notion-mcp-http
```

## Available Notion MCP Tools

When the server is running, these tools become available:

### Content Management
- **search**: Search across your Notion workspace and connected tools
- **fetch**: Retrieve content from a Notion page or database by URL
- **create-pages**: Create new Notion pages with properties and content
- **update-page**: Modify page properties or content
- **duplicate-page**: Copy existing pages

### Database Operations
- **create-database**: Create new databases with specified properties
- **update-database**: Modify database properties, name, and description

### Content Interaction
- **create-comment**: Add comments to pages
- **get-comments**: Retrieve all comments from a page
- **move-pages**: Relocate pages or databases to new parents

### User Management
- **get-users**: List all workspace users
- **get-user**: Get specific user information by ID
- **get-self**: Get information about the bot user and workspace

## Usage Examples

Once configured, AI assistants can use natural language commands like:
- "Search for documents mentioning 'project roadmap'"
- "Create a new project page in the Projects database"
- "Update the status of task XYZ to completed"
- "Get all comments on the design proposal page"

## Configuration Options

The server supports:
- **stdio transport** (default): For direct MCP integration
- **http transport**: For web-based integrations (runs on port 3001)
- **Authentication tokens**: Optional bearer token authentication for HTTP transport