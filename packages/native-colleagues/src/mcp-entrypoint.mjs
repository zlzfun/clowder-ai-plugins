#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { descriptor } from './descriptor.mjs';

const server = new McpServer({ name: 'clowder-native-colleagues', version: '0.1.0-alpha.2' });
server.registerTool('clowder_native_conversations_v1', {
  title: 'Native conversation directory',
  description: 'Read the versioned colleague directory for the native Console. This tool does not execute an Agent.',
  inputSchema: {}, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
}, async () => ({ content: [{ type: 'text', text: JSON.stringify(descriptor) }], structuredContent: descriptor }));
await server.connect(new StdioServerTransport());
