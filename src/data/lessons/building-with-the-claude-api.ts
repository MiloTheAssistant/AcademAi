import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 0,
    title: "Introduction to the Claude API",
    estimatedMinutes: 10,
    content: `
<h2>The Claude API: Your Direct Line to Claude</h2>
<p>The Claude API gives developers programmatic access to Claude's capabilities — the same intelligence behind claude.ai, accessible via HTTP requests from any language or platform. Building with the API means you can embed Claude's capabilities into your own products, automate workflows, and build entirely new applications.</p>

<h3>API Architecture</h3>
<p>The Claude API is a REST API hosted at <code>api.anthropic.com</code>. The primary endpoint is the Messages API, which follows a request/response pattern:</p>
<ul>
  <li>You send a POST request with a model name, a list of messages, and configuration parameters</li>
  <li>Claude processes the request and returns a response with the generated content</li>
  <li>Streaming variants return the response token-by-token for real-time display</li>
</ul>

<h3>Available Models</h3>
<p>Anthropic offers a tiered model family:</p>
<ul>
  <li><strong>Claude Haiku</strong> — fastest and most cost-efficient; ideal for high-volume, latency-sensitive tasks</li>
  <li><strong>Claude Sonnet</strong> — balanced capability and cost; the best choice for most production applications</li>
  <li><strong>Claude Opus</strong> — highest capability; use for complex reasoning where quality trumps speed</li>
</ul>
<p>Models are versioned (e.g., <code>claude-sonnet-4-5</code>). Pin to a specific version in production for stability; use the <code>latest</code> alias during development.</p>

<h3>Key Capabilities via API</h3>
<ul>
  <li>Text generation and transformation</li>
  <li>Vision — analyzing images and documents</li>
  <li>Tool use — Claude calling your defined functions</li>
  <li>Streaming — incremental response delivery</li>
  <li>System prompts — persistent instructions for every conversation turn</li>
  <li>Multi-turn conversations — stateful back-and-forth exchanges</li>
</ul>

<h3>Pricing Model</h3>
<p>The API is priced by token consumption — tokens in (input) and tokens out (output) are both charged, at different rates. Input tokens are generally cheaper than output tokens. Costs vary by model: Haiku is dramatically cheaper per token than Opus. For most applications, Sonnet offers the best cost/capability ratio.</p>
`,
    keyTakeaways: [
      "The Claude API is a REST API with a Messages endpoint for programmatic access to Claude",
      "Three model tiers: Haiku (fast/cheap), Sonnet (balanced), Opus (highest capability)",
      "Key capabilities: text generation, vision, tool use, streaming, and multi-turn conversations",
      "Pricing is per token (input + output); Haiku is cheapest, Opus most capable",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 1,
    title: "Authentication and Setup",
    estimatedMinutes: 10,
    content: `
<h2>Getting Authenticated and Set Up</h2>
<p>API authentication is straightforward: every request includes your API key in the <code>x-api-key</code> header. Getting your environment set up correctly from the start saves debugging time later.</p>

<h3>Generating an API Key</h3>
<ol>
  <li>Visit console.anthropic.com and sign in</li>
  <li>Navigate to API Keys in the left sidebar</li>
  <li>Click "Create Key" and give it a descriptive name</li>
  <li>Copy the key immediately — it won't be shown again</li>
</ol>
<p>Create separate keys for development and production. This lets you rotate keys independently and track usage by environment.</p>

<h3>Securing Your Key</h3>
<p>API keys provide billing access — treat them like passwords:</p>
<ul>
  <li>Store in environment variables, never in source code</li>
  <li>Add <code>.env</code> to your <code>.gitignore</code> before creating it</li>
  <li>For production, use a secrets manager (AWS Secrets Manager, Vault, etc.)</li>
  <li>Rotate keys if you suspect compromise</li>
</ul>

<h3>Installing the SDK</h3>
<p>Anthropic provides official SDKs for Python and TypeScript/JavaScript:</p>
<pre><code># Python
pip install anthropic

# Node.js
npm install @anthropic-ai/sdk</code></pre>

<h3>Your First API Call</h3>
<pre><code>import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: "claude-sonnet-4-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude!" }],
});

console.log(message.content[0].text);</code></pre>

<h3>Rate Limits and Quotas</h3>
<p>New API accounts start with rate limits on requests per minute (RPM) and tokens per minute (TPM). These limits increase as you establish usage history or on request. Monitor <code>x-ratelimit-remaining-requests</code> and <code>x-ratelimit-remaining-tokens</code> response headers in production to avoid hitting limits unexpectedly.</p>
`,
    keyTakeaways: [
      "Generate API keys at console.anthropic.com; create separate keys for dev and production",
      "Store keys in environment variables only — never in source code or version control",
      "Official SDKs available for Python (anthropic) and TypeScript (@anthropic-ai/sdk)",
      "Monitor rate limit headers in production; limits increase with usage history",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 2,
    title: "Making Basic API Requests",
    estimatedMinutes: 13,
    content: `
<h2>The Messages API in Depth</h2>
<p>The Messages API is the core of the Claude API. Understanding its request and response structure fully is the foundation for building anything on top of it.</p>

<h3>Request Structure</h3>
<pre><code>{
  "model": "claude-sonnet-4-5",       // required
  "max_tokens": 1024,                  // required
  "messages": [                        // required
    { "role": "user", "content": "..." }
  ],
  "system": "You are a helpful assistant.", // optional
  "temperature": 1,                    // optional, 0-1
  "top_p": 1,                          // optional
  "stop_sequences": ["\\n\\nHuman:"],  // optional
  "stream": false                      // optional
}</code></pre>

<h3>The Messages Array</h3>
<p>Messages alternate between <code>user</code> and <code>assistant</code> roles. For multi-turn conversations, include the full conversation history:</p>
<pre><code>messages: [
  { role: "user", content: "What's the capital of France?" },
  { role: "assistant", content: "The capital of France is Paris." },
  { role: "user", content: "What's its population?" }
]</code></pre>
<p>Claude uses the conversation history to maintain context, just like in the claude.ai interface.</p>

<h3>System Prompts</h3>
<p>The <code>system</code> parameter sets persistent instructions for Claude's behavior throughout the conversation. This is where you define Claude's role, constraints, and any context that should always be present:</p>
<pre><code>system: "You are a customer support agent for Acme Corp. Always be polite and professional.
Only answer questions about Acme products. If asked about competitors, politely decline."</code></pre>

<h3>Response Structure</h3>
<pre><code>{
  "id": "msg_01...",
  "type": "message",
  "role": "assistant",
  "content": [{ "type": "text", "text": "..." }],
  "model": "claude-sonnet-4-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 42
  }
}</code></pre>
<p>Always check <code>stop_reason</code>: <code>end_turn</code> means Claude finished naturally; <code>max_tokens</code> means the response was truncated — increase <code>max_tokens</code> if this happens unexpectedly.</p>

<h3>Temperature and Sampling</h3>
<p>Temperature controls randomness: 0 is nearly deterministic (same input → same output), 1 is the default creative range. For tasks requiring precision (code, math, factual Q&A), use lower temperatures. For creative tasks (writing, brainstorming), use higher values. Most production applications use temperature 0–0.5.</p>
`,
    keyTakeaways: [
      "The messages array contains alternating user/assistant turns — include full history for multi-turn conversations",
      "System prompts define Claude's role and constraints, applied to every turn in the conversation",
      "Always check stop_reason: max_tokens means the response was truncated and you need a higher limit",
      "Lower temperature (0–0.3) for precise tasks; higher (0.7–1) for creative tasks",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 3,
    title: "Prompt Engineering for API",
    estimatedMinutes: 14,
    content: `
<h2>Optimizing Prompts for Production API Use</h2>
<p>Prompt engineering for the API is different from conversational prompting. In production, prompts need to be reliable, efficient, and consistent across many inputs — not just good for a single interaction.</p>

<h3>System Prompt Design</h3>
<p>Your system prompt is the single most important lever for controlling API behavior. A well-designed system prompt:</p>
<ul>
  <li>Defines Claude's role and persona clearly</li>
  <li>Sets explicit constraints (what to do, what to avoid)</li>
  <li>Specifies output format requirements</li>
  <li>Provides necessary background context</li>
  <li>Handles edge cases explicitly</li>
</ul>
<pre><code>system: `You are a JSON API. Extract structured data from user text.
Always respond with valid JSON matching this schema:
{ "name": string, "email": string|null, "phone": string|null }
If a field cannot be found, use null.
Never include any text outside the JSON object.`</code></pre>

<h3>Few-Shot Examples in Prompts</h3>
<p>Providing examples in the messages array (few-shot prompting) is the most reliable technique for consistent output format. Include 2–5 examples before the actual request:</p>
<pre><code>messages: [
  { role: "user", content: "Sentiment: The product was amazing!" },
  { role: "assistant", content: "positive" },
  { role: "user", content: "Sentiment: Shipping took forever." },
  { role: "assistant", content: "negative" },
  { role: "user", content: "Sentiment: " + userReview }
]</code></pre>

<h3>Structured Output</h3>
<p>For API applications, you almost always want structured output rather than prose. Techniques for reliable structured output:</p>
<ul>
  <li>Specify the exact format in the system prompt with schema or example</li>
  <li>Use JSON output parsing with error handling (re-request on parse failure)</li>
  <li>Use prefill: start the assistant turn with <code>{"</code> to force JSON output</li>
</ul>

<h3>Prompt Caching</h3>
<p>For long system prompts or large context that's reused across requests, Anthropic offers prompt caching. Mark cacheable content with a <code>cache_control</code> block — subsequent requests that hit the cache are dramatically cheaper and faster. Ideal for large documents, extensive few-shot examples, or static knowledge bases.</p>

<h3>Testing Prompts</h3>
<p>Test prompts with a diverse set of inputs before deploying. Edge cases to test: empty inputs, very long inputs, inputs in unexpected languages, inputs that try to override instructions, and unusual but valid inputs. Build a test set and run it whenever you change prompts.</p>
`,
    keyTakeaways: [
      "The system prompt is your most powerful lever — define role, constraints, format, and edge cases explicitly",
      "Few-shot examples in the messages array are the most reliable technique for consistent output format",
      "Use prefill and schema specification to get reliable structured JSON output",
      "Prompt caching dramatically reduces cost and latency for long, reused prompts",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 4,
    title: "Advanced Features: Streaming and Vision",
    estimatedMinutes: 13,
    content: `
<h2>Streaming Responses and Image Understanding</h2>
<p>Two features — streaming and vision — unlock entire categories of applications that aren't possible with basic text generation. This module covers both in depth.</p>

<h3>Streaming</h3>
<p>Streaming delivers the response token-by-token as it's generated, rather than waiting for the complete response. This is essential for conversational applications where users expect to see responses appearing in real time.</p>
<pre><code>const stream = await client.messages.stream({
  model: "claude-sonnet-4-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Write a haiku about coding." }],
});

for await (const event of stream) {
  if (event.type === "content_block_delta") {
    process.stdout.write(event.delta.text);
  }
}

const finalMessage = await stream.finalMessage();</code></pre>

<h3>Streaming Event Types</h3>
<p>The streaming API sends several event types. The important ones:</p>
<ul>
  <li><code>message_start</code> — beginning of the response, includes model info</li>
  <li><code>content_block_delta</code> — a new chunk of text, append to your buffer</li>
  <li><code>message_delta</code> — metadata update including stop_reason</li>
  <li><code>message_stop</code> — response is complete</li>
</ul>

<h3>Vision: Image Understanding</h3>
<p>Claude can analyze images passed in the messages content array. Images can be passed as base64-encoded data or as URLs:</p>
<pre><code>messages: [{
  role: "user",
  content: [
    {
      type: "image",
      source: {
        type: "base64",
        media_type: "image/jpeg",
        data: base64ImageData,
      }
    },
    {
      type: "text",
      text: "What's in this image? Describe in detail."
    }
  ]
}]</code></pre>

<h3>Vision Use Cases</h3>
<ul>
  <li><strong>Document processing:</strong> Extract text and structure from scanned PDFs or forms</li>
  <li><strong>UI analysis:</strong> Describe or evaluate screenshots, wireframes, or designs</li>
  <li><strong>Chart interpretation:</strong> Extract data and insights from charts and graphs</li>
  <li><strong>Quality inspection:</strong> Analyze product images for defects or compliance</li>
  <li><strong>Accessibility:</strong> Generate alt text for images automatically</li>
</ul>

<h3>Image Best Practices</h3>
<p>For best vision results: use high-resolution images when text needs to be read; include specific questions about what you need from the image; multiple images can be included in one request for comparison tasks. Keep image sizes reasonable — large images consume many tokens.</p>
`,
    keyTakeaways: [
      "Streaming delivers responses token-by-token — essential for conversational UIs",
      "Handle content_block_delta events to build streaming output; message_stop signals completion",
      "Vision accepts base64 or URL images alongside text in the content array",
      "Vision use cases: document processing, chart interpretation, UI analysis, accessibility",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 5,
    title: "Function Calling and Tool Use",
    estimatedMinutes: 15,
    content: `
<h2>Extending Claude with Custom Tools</h2>
<p>Tool use lets Claude call functions you define as part of completing a task. Instead of generating an answer directly, Claude can trigger your code — querying a database, calling an API, running a calculation — and use the results to inform its response.</p>

<h3>Defining Tools</h3>
<p>Tools are defined in the API request with a name, description, and input schema:</p>
<pre><code>tools: [{
  name: "get_weather",
  description: "Get current weather for a city. Use this when the user asks about weather.",
  input_schema: {
    type: "object",
    properties: {
      city: { type: "string", description: "City name" },
      units: { type: "string", enum: ["celsius", "fahrenheit"], default: "celsius" }
    },
    required: ["city"]
  }
}]</code></pre>

<h3>The Tool Use Flow</h3>
<ol>
  <li>Send request with tools defined</li>
  <li>Claude returns a <code>tool_use</code> block if it wants to call a tool</li>
  <li>You execute the tool with the provided inputs</li>
  <li>Send the result back as a <code>tool_result</code> message</li>
  <li>Claude generates its final response using the tool result</li>
</ol>

<h3>Handling Tool Calls</h3>
<pre><code>// Claude's response when it wants to call a tool:
{
  "type": "tool_use",
  "id": "toolu_01...",
  "name": "get_weather",
  "input": { "city": "London", "units": "celsius" }
}

// Your response with the tool result:
{
  role: "user",
  content: [{
    type: "tool_result",
    tool_use_id: "toolu_01...",
    content: JSON.stringify({ temp: 18, condition: "cloudy", humidity: 72 })
  }]
}</code></pre>

<h3>Multiple Tools</h3>
<p>You can define multiple tools; Claude chooses which to call based on the context. Claude may also call multiple tools in sequence within a single turn (though multi-step tool use requires multiple API rounds if you need to execute each tool call).</p>

<h3>Tool Design Best Practices</h3>
<ul>
  <li><strong>Clear descriptions:</strong> Claude decides whether to use a tool based on your description — make it specific</li>
  <li><strong>Explicit input schemas:</strong> Define required fields and types precisely; Claude uses this to form valid calls</li>
  <li><strong>Idempotent where possible:</strong> Design tools that are safe to call multiple times</li>
  <li><strong>Return structured data:</strong> JSON responses are easier for Claude to reason about than prose</li>
</ul>
`,
    keyTakeaways: [
      "Tools let Claude call your functions as part of answering — enabling real-time data and actions",
      "Define tools with name, description (Claude reads this to decide when to use it), and input schema",
      "The tool use flow: Claude requests → you execute → you return result → Claude responds",
      "Clear tool descriptions and precise input schemas are critical for reliable tool use",
    ],
  },
  {
    courseSlug: "building-with-the-claude-api",
    moduleIndex: 6,
    title: "Production Deployment Best Practices",
    estimatedMinutes: 13,
    content: `
<h2>Taking Claude API Applications to Production</h2>
<p>Moving from a working prototype to a reliable production application requires attention to error handling, cost management, security, and observability. This module covers the practices that separate production-ready from demo-ready.</p>

<h3>Error Handling</h3>
<p>The Claude API returns standard HTTP status codes. Handle these explicitly:</p>
<ul>
  <li><code>400</code> — Invalid request (usually a prompt or parameter issue) — log and fix</li>
  <li><code>401</code> — Authentication error — check API key</li>
  <li><code>429</code> — Rate limit — implement exponential backoff and retry</li>
  <li><code>500/529</code> — API overloaded — retry with backoff</li>
</ul>
<pre><code>async function callWithRetry(params, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.messages.create(params);
    } catch (err) {
      if (err.status === 429 || err.status >= 500) {
        await sleep(Math.pow(2, i) * 1000); // exponential backoff
        continue;
      }
      throw err; // don't retry other errors
    }
  }
}</code></pre>

<h3>Cost Management</h3>
<ul>
  <li><strong>Right-size your model:</strong> Use Haiku for classification/extraction, Sonnet for general tasks, Opus only for complex reasoning</li>
  <li><strong>Set max_tokens appropriately:</strong> Don't default to 4096 if most responses are under 200 tokens</li>
  <li><strong>Use prompt caching:</strong> For repeated long context, caching reduces costs by up to 90%</li>
  <li><strong>Monitor token usage:</strong> Track input/output tokens per request type to identify optimization opportunities</li>
</ul>

<h3>Security</h3>
<ul>
  <li><strong>Never expose the API key client-side:</strong> All API calls must go through your backend</li>
  <li><strong>Validate user input:</strong> Sanitize inputs before including them in prompts</li>
  <li><strong>Implement prompt injection defenses:</strong> Be aware that user content can attempt to override system instructions</li>
  <li><strong>Rate limit your users:</strong> Apply per-user limits to prevent abuse and runaway costs</li>
</ul>

<h3>Observability</h3>
<p>Log enough to debug production issues without logging sensitive user data:</p>
<ul>
  <li>Request ID (from <code>request-id</code> response header)</li>
  <li>Model used and token counts</li>
  <li>Latency (time to first token, total time)</li>
  <li>Stop reason and any error codes</li>
</ul>
<p>Use these metrics to monitor quality, track costs, and identify regressions when you update prompts.</p>

<h3>Testing and Evaluation</h3>
<p>Build an evaluation harness: a set of representative inputs with expected outputs (or quality criteria). Run evaluations before deploying prompt changes. LLM behavior can shift in subtle ways — systematic evaluation catches regressions before they reach production users.</p>
`,
    keyTakeaways: [
      "Handle 429 and 5xx errors with exponential backoff retry; 4xx errors usually require code fixes",
      "Right-size your model per task type — using Haiku for extraction can cut costs dramatically",
      "Never expose the API key client-side; implement per-user rate limits to prevent abuse",
      "Build an evaluation harness to catch prompt regressions before they reach production",
    ],
  },
];

export default lessons;
