import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('installed-style stdio transport exposes only the two-colleague data directory', async () => {
  const client = new Client({ name: 'native-directory-test', version: '1.0.0' });
  const transport = new StdioClientTransport({ command: process.execPath, args: [fileURLToPath(new URL('../src/mcp-entrypoint.mjs', import.meta.url))] });
  await client.connect(transport);
  try {
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map((tool) => tool.name), ['clowder_native_conversations_v1']);
    const result = await client.callTool({ name: tools.tools[0].name, arguments: {} });
    assert.equal(result.isError, undefined);
    assert.equal(result.structuredContent.schemaVersion, 1);
    assert.deepEqual(result.structuredContent.entities.map((entity) => entity.name), ['松果', '青禾']);
    assert.ok(result.structuredContent.entities.every((entity) => !('threadId' in entity) && !('command' in entity)));
  } finally { await client.close(); }
});
