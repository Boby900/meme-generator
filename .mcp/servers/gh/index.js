#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';

// Load environment variables
config({ path: '../../../.env.local' });

const server = new Server(
  {
    name: 'github-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Get repo info from current directory or environment
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'your-username';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'meme-generator';

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_issues',
        description: 'Get issues from the GitHub repository',
        inputSchema: {
          type: 'object',
          properties: {
            state: {
              type: 'string',
              enum: ['open', 'closed', 'all'],
              default: 'open',
              description: 'Filter issues by state'
            },
            labels: {
              type: 'string',
              description: 'Comma-separated list of label names to filter by'
            },
            limit: {
              type: 'number',
              default: 10,
              description: 'Maximum number of issues to return'
            }
          }
        }
      },
      {
        name: 'create_issue',
        description: 'Create a new issue in the GitHub repository',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Issue title'
            },
            body: {
              type: 'string',
              description: 'Issue body/description'
            },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of label names'
            }
          },
          required: ['title']
        }
      },
      {
        name: 'get_pull_requests',
        description: 'Get pull requests from the GitHub repository',
        inputSchema: {
          type: 'object',
          properties: {
            state: {
              type: 'string',
              enum: ['open', 'closed', 'all'],
              default: 'open',
              description: 'Filter PRs by state'
            },
            limit: {
              type: 'number',
              default: 10,
              description: 'Maximum number of PRs to return'
            }
          }
        }
      },
      {
        name: 'get_repo_info',
        description: 'Get basic information about the repository',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_issues': {
        const { state = 'open', labels, limit = 10 } = args;
        const response = await octokit.rest.issues.listForRepo({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          state,
          labels,
          per_page: limit
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response.data.map(issue => ({
              number: issue.number,
              title: issue.title,
              state: issue.state,
              created_at: issue.created_at,
              updated_at: issue.updated_at,
              labels: issue.labels.map(label => label.name),
              url: issue.html_url
            })), null, 2)
          }]
        };
      }

      case 'create_issue': {
        const { title, body, labels } = args;
        const response = await octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title,
          body,
          labels
        });

        return {
          content: [{
            type: 'text',
            text: `Created issue #${response.data.number}: ${response.data.title}\nURL: ${response.data.html_url}`
          }]
        };
      }

      case 'get_pull_requests': {
        const { state = 'open', limit = 10 } = args;
        const response = await octokit.rest.pulls.list({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          state,
          per_page: limit
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response.data.map(pr => ({
              number: pr.number,
              title: pr.title,
              state: pr.state,
              created_at: pr.created_at,
              updated_at: pr.updated_at,
              url: pr.html_url,
              head: pr.head.ref,
              base: pr.base.ref
            })), null, 2)
          }]
        };
      }

      case 'get_repo_info': {
        const response = await octokit.rest.repos.get({
          owner: REPO_OWNER,
          repo: REPO_NAME
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              name: response.data.name,
              full_name: response.data.full_name,
              description: response.data.description,
              private: response.data.private,
              url: response.data.html_url,
              stars: response.data.stargazers_count,
              forks: response.data.forks_count,
              language: response.data.language,
              created_at: response.data.created_at,
              updated_at: response.data.updated_at
            }, null, 2)
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GitHub MCP server running on stdio');
}

main().catch(console.error);
