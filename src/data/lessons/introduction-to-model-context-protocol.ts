import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 0,
    title: "Introduction to MCP",
    estimatedMinutes: 10,
    content: `
<h2>What Is the Model Context Protocol?</h2>
<p>The Model Context Protocol (MCP) is an open standard developed by Anthropic that defines how AI models connect to external tools, data sources, and services. Think of it as a universal adapter — instead of building a custom integration for every tool an AI might need, MCP provides a standard interface that any tool can implement.</p>

<h3>The Integration Problem MCP Solves</h3>
<p>Before MCP, integrating an AI assistant with external tools required custom code for every combination: Claude + GitHub needed one integration, Claude + Postgres needed another, Claude + Slack needed a third. Each integration was a one-off, hard to share, and hard to maintain. Multiply this across dozens of tools and hundreds of AI products and you have a combinatorial explosion of integration work.</p>
<p>MCP introduces a standard client-server protocol. Once a tool implements an MCP server, any MCP-compatible AI host can use it immediately. And once an AI host implements MCP client support, it can connect to any existing MCP server.</p>

<h3>The MCP Architecture</h3>
<ul>
  <li><strong>MCP Host:</strong> The AI application (Claude Desktop, Claude Code, a custom app) that wants to use external capabilities</li>
  <li><strong>MCP Client:</strong> The component within the host that speaks the MCP protocol</li>
  <li><strong>MCP Server:</strong> A lightweight service that exposes capabilities (tools, resources, prompts) via the MCP protocol</li>
</ul>

<h3>The Three Primitives</h3>
<p>MCP servers expose three types of capabilities:</p>
<ul>
  <li><strong>Tools:</strong> Functions the AI can call (search the web, query a database, send an email)</li>
  <li><strong>Resources:</strong> Data the AI can read (files, database records, API responses)</li>
  <li><strong>Prompts:</strong> Reusable prompt templates the AI can invoke</li>
</ul>

<h3>Why MCP Matters</h3>
<p>MCP is already supported by Claude Desktop, Claude Code, and a growing number of third-party AI applications. The ecosystem of MCP servers is expanding rapidly — for developers building AI-powered applications, MCP is increasingly the standard way to extend AI capabilities.</p>
`,
    keyTakeaways: [
      "MCP is an open standard for AI-to-tool connectivity — a universal adapter replacing custom integrations",
      "Architecture: MCP Host (AI app) ↔ MCP Client ↔ MCP Server (external tool)",
      "Three primitives: Tools (callable functions), Resources (readable data), Prompts (templates)",
      "Supported by Claude Desktop and Claude Code; growing ecosystem of pre-built servers",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 1,
    title: "MCP Architecture",
    estimatedMinutes: 12,
    content: `
<h2>How MCP Works Under the Hood</h2>
<p>Understanding MCP's architecture helps you design servers that are reliable, efficient, and properly integrated with AI hosts. This module covers the protocol mechanics and design principles.</p>

<h3>Transport Layer</h3>
<p>MCP supports two transport mechanisms:</p>
<ul>
  <li><strong>stdio (standard input/output):</strong> The MCP server is a child process that communicates via stdin/stdout. The host spawns the server, sends JSON-RPC messages, and reads responses. This is the simplest setup and works for local tools.</li>
  <li><strong>HTTP with SSE (Server-Sent Events):</strong> The MCP server runs as an HTTP server. The host connects via HTTP and receives server-to-client messages via SSE. This works for remote servers and network-accessible services.</li>
</ul>

<h3>JSON-RPC Protocol</h3>
<p>MCP uses JSON-RPC 2.0 for all messages between client and server. The flow:</p>
<ol>
  <li><strong>Initialize:</strong> Client sends capabilities; server responds with its capabilities (tools, resources, prompts)</li>
  <li><strong>List:</strong> Client requests the list of available tools/resources/prompts</li>
  <li><strong>Call/Read/Get:</strong> Client invokes a specific capability</li>
  <li><strong>Response:</strong> Server returns the result</li>
</ol>

<h3>Capability Discovery</h3>
<p>When a host connects to an MCP server, it first discovers what the server can do. The server responds with a manifest of its capabilities — tool names, descriptions, input schemas, resource URIs, prompt templates. The host presents these to the AI model, which can then decide which capabilities to use.</p>

<h3>Stateful vs. Stateless Servers</h3>
<p>MCP servers can be stateful (maintaining session state between calls) or stateless (treating each call independently). Stateless servers are simpler and more scalable. Stateful servers can maintain context across multiple tool calls within a session — useful for things like iterative database queries or multi-step workflows.</p>

<h3>Error Handling in MCP</h3>
<p>MCP defines standard error codes and error response formats. Servers should return meaningful error messages when tools fail — these error messages are passed back to the AI model, which can decide to retry, try an alternative approach, or surface the error to the user.</p>
`,
    keyTakeaways: [
      "Two transport options: stdio (local subprocess) and HTTP+SSE (remote/networked servers)",
      "JSON-RPC 2.0 protocol: Initialize → List capabilities → Invoke → Receive result",
      "Capability discovery happens at connection time — the host learns what the server can do",
      "Prefer stateless servers for simplicity and scalability; use stateful only when session context is needed",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 2,
    title: "Understanding Tools, Resources, and Prompts",
    estimatedMinutes: 12,
    content: `
<h2>MCP's Three Core Primitives</h2>
<p>Everything an MCP server exposes falls into one of three categories: Tools, Resources, or Prompts. Understanding when to use each is fundamental to good MCP server design.</p>

<h3>Tools: Callable Functions</h3>
<p>Tools are functions the AI model can call to take actions or retrieve information. Each tool has a name, description, and input schema:</p>
<pre><code>{
  "name": "search_database",
  "description": "Search the product database for items matching a query. Returns up to 10 results.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search terms" },
      "category": { "type": "string", "enum": ["electronics", "clothing", "books"] }
    },
    "required": ["query"]
  }
}</code></pre>
<p>Tools are the most commonly used primitive. Examples: web search, database query, file operations, API calls, sending emails, creating calendar events.</p>

<h3>Resources: Readable Data</h3>
<p>Resources are data sources the AI can read. Unlike tools (which execute code), resources represent data that can be fetched by URI:</p>
<pre><code>{
  "uri": "file:///project/README.md",
  "name": "Project README",
  "description": "Main documentation for the project",
  "mimeType": "text/markdown"
}</code></pre>
<p>Resources are appropriate for relatively static data that the AI reads but doesn't modify. Examples: configuration files, documentation, database schemas, API specifications.</p>

<h3>Prompts: Reusable Templates</h3>
<p>Prompts are parameterized templates that the AI host can present to the user or use programmatically. They encapsulate domain-specific workflows:</p>
<pre><code>{
  "name": "code_review",
  "description": "Review code for quality and security",
  "arguments": [
    { "name": "language", "description": "Programming language", "required": true },
    { "name": "focus", "description": "Review focus: security, performance, or style" }
  ]
}</code></pre>
<p>Prompts are less commonly used than Tools and Resources but valuable for standardizing complex interaction patterns.</p>

<h3>Choosing the Right Primitive</h3>
<ul>
  <li>Use <strong>Tools</strong> when the AI needs to perform an action or make a live query</li>
  <li>Use <strong>Resources</strong> when the AI needs to read relatively stable data</li>
  <li>Use <strong>Prompts</strong> when you want to define reusable, parameterized AI interaction patterns</li>
</ul>
`,
    keyTakeaways: [
      "Tools are callable functions — for actions and live queries; most commonly used primitive",
      "Resources are readable data at URIs — for relatively static information the AI reads but doesn't modify",
      "Prompts are parameterized templates — for standardizing complex interaction patterns",
      "Choose based on whether you need to take action (Tool), read data (Resource), or template a workflow (Prompt)",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 3,
    title: "Building MCP Servers with Python",
    estimatedMinutes: 15,
    content: `
<h2>Creating Your First MCP Server</h2>
<p>The MCP Python SDK provides a clean, decorator-based API for building servers. This module walks through building a complete MCP server with tools, resources, and proper error handling.</p>

<h3>Installation</h3>
<pre><code>pip install mcp</code></pre>

<h3>Minimal Server</h3>
<pre><code>from mcp.server import Server
from mcp.server.stdio import stdio_server
import mcp.types as types

app = Server("my-first-server")

@app.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="add",
            description="Add two numbers together",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number"},
                    "b": {"type": "number"}
                },
                "required": ["a", "b"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "add":
        result = arguments["a"] + arguments["b"]
        return [types.TextContent(type="text", text=str(result))]
    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())

import asyncio
asyncio.run(main())</code></pre>

<h3>Adding Resources</h3>
<pre><code>@app.list_resources()
async def list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="config://app/settings",
            name="Application Settings",
            mimeType="application/json"
        )
    ]

@app.read_resource()
async def read_resource(uri: str) -> str:
    if uri == "config://app/settings":
        return json.dumps({"theme": "dark", "language": "en"})
    raise ValueError(f"Unknown resource: {uri}")</code></pre>

<h3>Error Handling</h3>
<p>Return structured errors from tool calls so the AI model can handle them gracefully:</p>
<pre><code>@app.call_tool()
async def call_tool(name: str, arguments: dict):
    try:
        # ... tool logic ...
    except DatabaseError as e:
        return [types.TextContent(
            type="text",
            text=f"Database error: {str(e)}. The query may need to be adjusted."
        )]</code></pre>

<h3>Testing Your Server</h3>
<p>The MCP Inspector is a GUI tool for testing servers during development. Run it with:</p>
<pre><code>npx @modelcontextprotocol/inspector python my_server.py</code></pre>
<p>The Inspector lets you invoke tools, read resources, and see the full JSON-RPC message flow.</p>
`,
    keyTakeaways: [
      "Install with pip install mcp; use @app.list_tools() and @app.call_tool() decorators",
      "Return structured error messages from tool calls so the AI can handle failures gracefully",
      "Add resources with @app.list_resources() and @app.read_resource() decorators",
      "Use the MCP Inspector (npx @modelcontextprotocol/inspector) to test servers during development",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 4,
    title: "Building MCP Clients",
    estimatedMinutes: 13,
    content: `
<h2>Creating Applications That Connect to MCP Servers</h2>
<p>An MCP client is the component in your application that connects to MCP servers and makes their capabilities available to Claude or another AI model. Building a client lets you create custom AI applications with full control over which servers are connected and how their capabilities are used.</p>

<h3>Client Architecture</h3>
<p>An MCP client application typically has three layers:</p>
<ol>
  <li><strong>MCP connection layer:</strong> Manages connections to one or more MCP servers</li>
  <li><strong>Tool routing layer:</strong> Routes tool call requests from Claude to the appropriate server</li>
  <li><strong>Claude integration layer:</strong> Manages the conversation with Claude, passing available tools and handling responses</li>
</ol>

<h3>Basic Client Implementation</h3>
<pre><code>from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import anthropic

async def run_with_mcp():
    # Connect to an MCP server
    server_params = StdioServerParameters(
        command="python",
        args=["my_server.py"]
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Get available tools
            tools_result = await session.list_tools()
            tools = tools_result.tools

            # Convert MCP tools to Claude API format
            claude_tools = [{
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema
            } for tool in tools]

            # Call Claude with the tools available
            client = anthropic.Anthropic()
            response = client.messages.create(
                model="claude-sonnet-4-5",
                max_tokens=1024,
                tools=claude_tools,
                messages=[{"role": "user", "content": "Add 15 and 27"}]
            )

            # Handle tool calls
            if response.stop_reason == "tool_use":
                for block in response.content:
                    if block.type == "tool_use":
                        result = await session.call_tool(block.name, block.input)
                        # Continue conversation with tool result...</code></pre>

<h3>Connecting to Multiple Servers</h3>
<p>A client can maintain connections to multiple MCP servers simultaneously. Each server contributes its tools, resources, and prompts to a combined pool that Claude can access. Use namespacing (e.g., <code>github_create_issue</code> vs <code>jira_create_issue</code>) to avoid tool name collisions.</p>

<h3>Client Configuration</h3>
<p>For Claude Desktop and Claude Code, MCP server connections are configured in a JSON file:</p>
<pre><code>// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["/path/to/my_server.py"],
      "env": { "DATABASE_URL": "..." }
    }
  }
}</code></pre>
`,
    keyTakeaways: [
      "MCP clients have three layers: connection management, tool routing, and Claude integration",
      "Convert MCP tool definitions to Claude API tool format for use in messages.create()",
      "Handle tool_use stop_reason by calling session.call_tool() and continuing the conversation",
      "Connect to multiple servers simultaneously; use namespacing to avoid tool name collisions",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 5,
    title: "Connecting Claude to External Services",
    estimatedMinutes: 13,
    content: `
<h2>Real-World MCP Integration Examples</h2>
<p>The value of MCP is most apparent when connecting Claude to real services. This module covers practical integration patterns for common services.</p>

<h3>GitHub Integration</h3>
<p>The official GitHub MCP server exposes GitHub's API as MCP tools. Once connected, Claude can:</p>
<ul>
  <li>Search code, issues, and pull requests</li>
  <li>Read file contents from any branch</li>
  <li>Create issues, comments, and pull requests</li>
  <li>Manage branches and labels</li>
</ul>
<pre><code>// In claude_desktop_config.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    }
  }
}</code></pre>

<h3>Database Integration</h3>
<p>MCP database servers expose read-only (or read-write) query capabilities. A Postgres MCP server implementation:</p>
<pre><code>@app.list_tools()
async def list_tools():
    return [
        types.Tool(
            name="query",
            description="Execute a read-only SQL query on the database",
            inputSchema={
                "type": "object",
                "properties": {"sql": {"type": "string"}},
                "required": ["sql"]
            }
        ),
        types.Tool(
            name="describe_table",
            description="Get the schema for a specific table",
            inputSchema={
                "type": "object",
                "properties": {"table_name": {"type": "string"}},
                "required": ["table_name"]
            }
        )
    ]</code></pre>

<h3>File System Integration</h3>
<p>The filesystem MCP server provides sandboxed access to specific directories:</p>
<pre><code>{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    }
  }
}</code></pre>
<p>Restricting access to specific directories is critical for safety — don't give Claude access to your entire file system.</p>

<h3>Custom Business Logic Integration</h3>
<p>MCP's real power is in building custom servers for your own systems. A CRM MCP server might expose: <code>search_contacts</code>, <code>get_customer_history</code>, <code>create_support_ticket</code>, <code>update_account_status</code>. With these tools available, Claude can handle complex customer support workflows that would otherwise require many manual steps.</p>
`,
    keyTakeaways: [
      "Official MCP servers exist for GitHub, databases, filesystem, Slack, and many more",
      "Restrict filesystem access to specific allowed directories — never the full filesystem",
      "Custom MCP servers for your own systems unlock the highest-value enterprise use cases",
      "MCP turns Claude into a natural language interface to your entire tool ecosystem",
    ],
  },
  {
    courseSlug: "introduction-to-model-context-protocol",
    moduleIndex: 6,
    title: "Security and Best Practices",
    estimatedMinutes: 11,
    content: `
<h2>Building Secure MCP Systems</h2>
<p>MCP gives AI models real capabilities — the ability to read files, query databases, call APIs, and take actions in external systems. With this power comes responsibility. Security must be designed in from the start, not added as an afterthought.</p>

<h3>Principle of Least Privilege</h3>
<p>Every MCP server should expose only the minimum capabilities needed:</p>
<ul>
  <li>A server for customer support shouldn't have access to financial records</li>
  <li>A read-only analysis server shouldn't have write tools</li>
  <li>A file server should only access specific allowed directories</li>
</ul>
<p>More capabilities mean more attack surface. Keep server scope tight.</p>

<h3>Input Validation</h3>
<p>Validate all inputs to your MCP tools. The AI model constructs tool inputs based on user requests — those user requests might be adversarial. Validate types, check lengths, sanitize strings before passing to downstream systems:</p>
<pre><code>@app.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "query":
        sql = arguments.get("sql", "")
        if not is_safe_query(sql):  # validate: read-only, no DROP/DELETE
            raise ValueError("Only SELECT queries are allowed")
        # execute...</code></pre>

<h3>Prompt Injection Awareness</h3>
<p>Prompt injection is when malicious content in data (e.g., a file Claude reads) tries to override Claude's behavior. When building MCP servers that return external data, be aware that returned content will be read by Claude. Don't trust external content as instructions. Wrap returned data clearly as data, not instructions.</p>

<h3>Authentication and Secrets</h3>
<ul>
  <li>Pass secrets via environment variables, not command-line arguments (which are visible in process lists)</li>
  <li>Use short-lived credentials where possible (OAuth tokens vs. long-lived API keys)</li>
  <li>Rotate secrets if an MCP server is compromised</li>
  <li>Never log secrets in server output</li>
</ul>

<h3>Audit Logging</h3>
<p>Log all tool calls with: timestamp, tool name, input parameters (sanitized), result status, and caller identity. This provides an audit trail for investigating incidents and compliance purposes. For high-privilege tools (write access to databases, file deletion), require explicit confirmation before execution.</p>
`,
    keyTakeaways: [
      "Apply least privilege — expose only the minimum capabilities each server needs",
      "Validate all tool inputs; never trust AI-constructed arguments without sanitization",
      "Be aware of prompt injection — external data returned by tools will be read by Claude",
      "Log all tool calls for audit trails; require confirmation before high-privilege destructive actions",
    ],
  },
];

export default lessons;
