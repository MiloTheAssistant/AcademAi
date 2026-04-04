import type { LessonContent } from "../lessons";

const lessons: LessonContent[] = [
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 0,
    title: "Introduction to Vertex AI",
    estimatedMinutes: 10,
    content: `
<h2>Claude on Google Cloud's Vertex AI</h2>
<p>Vertex AI is Google Cloud's unified machine learning platform. Anthropic has partnered with Google Cloud to make Claude models available through Vertex AI, giving GCP customers a native way to access Claude within their existing Google Cloud infrastructure.</p>

<h3>Why Use Vertex AI for Claude?</h3>
<p>If your infrastructure is on Google Cloud, Vertex AI offers several compelling advantages over calling the Anthropic API directly:</p>
<ul>
  <li><strong>Google Cloud IAM:</strong> Use service accounts and workload identity instead of managing API keys</li>
  <li><strong>GCP billing:</strong> Claude usage appears on your GCP invoice alongside other services</li>
  <li><strong>VPC Service Controls:</strong> Keep traffic within your GCP network perimeter</li>
  <li><strong>Vertex AI ecosystem:</strong> Native integration with BigQuery, Cloud Storage, Dataflow, and other GCP services</li>
  <li><strong>Compliance:</strong> GCP's compliance certifications (ISO, SOC, HIPAA BAA) cover Vertex AI</li>
</ul>

<h3>Available Claude Models on Vertex AI</h3>
<p>Anthropic's Claude models available on Vertex AI include Claude Haiku, Sonnet, and Opus. Availability varies by region — us-central1, us-east4, europe-west4, and asia-southeast1 are primary regions. New model versions appear on Vertex AI shortly after they're available on the direct API.</p>

<h3>Vertex AI vs. Google AI Studio</h3>
<p>Google also offers Claude through Google AI Studio, which is designed for individual developers and prototyping. Vertex AI is the enterprise offering with full SLAs, compliance support, and production-grade features. For production applications on GCP, use Vertex AI.</p>
`,
    keyTakeaways: [
      "Vertex AI makes Claude available natively in GCP with IAM auth and GCP billing",
      "Use Vertex AI when your stack is on GCP — not for GCP-agnostic or personal projects",
      "Primary Claude-on-Vertex regions: us-central1, us-east4, europe-west4, asia-southeast1",
      "Vertex AI is the production option; Google AI Studio is for prototyping",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 1,
    title: "Setting Up Claude in Vertex AI",
    estimatedMinutes: 11,
    content: `
<h2>Enabling and Configuring Claude on Vertex AI</h2>
<p>Setting up Claude on Vertex AI requires enabling the Model Garden, accepting model terms, and configuring your GCP project. These are one-time setup steps.</p>

<h3>Enable the Vertex AI API</h3>
<pre><code>gcloud services enable aiplatform.googleapis.com</code></pre>
<p>Or enable it in the GCP console under APIs &amp; Services.</p>

<h3>Access Claude in Model Garden</h3>
<ol>
  <li>Open the Vertex AI console and navigate to Model Garden</li>
  <li>Search for "Claude" to find Anthropic's models</li>
  <li>Click on the model card and accept Anthropic's Terms of Service</li>
  <li>Note the model ID for use in API calls</li>
</ol>

<h3>Model IDs on Vertex AI</h3>
<p>Vertex AI uses publisher model IDs in the format:</p>
<pre><code>publishers/anthropic/models/claude-sonnet-4-5@20251001</code></pre>
<p>Or in shorthand for the Anthropic SDK's Vertex adapter:</p>
<pre><code>claude-sonnet-4-5@20251001</code></pre>

<h3>Installing Required Libraries</h3>
<pre><code># Python
pip install anthropic[vertex]
# or
pip install google-cloud-aiplatform anthropic

# Node.js
npm install @anthropic-ai/sdk @anthropic-ai/vertex-sdk</code></pre>

<h3>Project and Region Configuration</h3>
<p>Set your GCP project and region as environment variables or pass them directly to the client:</p>
<pre><code>export GOOGLE_CLOUD_PROJECT=my-project-id
export GOOGLE_CLOUD_REGION=us-central1</code></pre>
<p>Choose a region where Claude is available and that aligns with your data residency requirements.</p>
`,
    keyTakeaways: [
      "Enable the Vertex AI API and accept model terms in Model Garden before first use",
      "Model IDs use publishers/anthropic/models/... format or shorthand with @version date",
      "Install anthropic[vertex] (Python) or @anthropic-ai/vertex-sdk (Node.js)",
      "Set GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_REGION environment variables",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 2,
    title: "Authentication and IAM",
    estimatedMinutes: 11,
    content: `
<h2>Google Cloud IAM for Vertex AI Access</h2>
<p>Vertex AI uses Google Cloud's IAM system for authentication and authorization. Understanding GCP's auth patterns is key to securely deploying Claude applications on Vertex AI.</p>

<h3>Application Default Credentials</h3>
<p>The Google Cloud SDK provides Application Default Credentials (ADC) — the recommended authentication mechanism for most applications. ADC automatically selects the appropriate credentials based on the environment:</p>
<ul>
  <li><strong>Local development:</strong> <code>gcloud auth application-default login</code></li>
  <li><strong>Cloud Run/GKE/Compute Engine:</strong> Service account attached to the resource</li>
  <li><strong>Other environments:</strong> Set <code>GOOGLE_APPLICATION_CREDENTIALS</code> to a service account JSON key path</li>
</ul>

<h3>Required IAM Roles</h3>
<p>The minimum role for calling Claude on Vertex AI:</p>
<ul>
  <li><strong>roles/aiplatform.user</strong> — allows calling Vertex AI prediction endpoints</li>
</ul>
<p>For more granular control, you can create a custom role with just the <code>aiplatform.endpoints.predict</code> permission.</p>

<h3>Service Accounts for Production</h3>
<pre><code># Create a service account
gcloud iam service-accounts create claude-vertex-sa \
  --display-name="Claude Vertex AI Service Account"

# Grant the Vertex AI user role
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:claude-vertex-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"</code></pre>
<p>For Cloud Run, GKE, or Compute Engine, attach this service account to the resource rather than using key files. Key files are only appropriate for environments where workload identity isn't available.</p>

<h3>Workload Identity for GKE</h3>
<p>If running in GKE, use Workload Identity to bind a Kubernetes service account to a GCP service account. This eliminates the need for service account key files entirely — the most secure option for Kubernetes deployments.</p>
`,
    keyTakeaways: [
      "Use Application Default Credentials (ADC) — works automatically in GCP environments",
      "Minimum required role: roles/aiplatform.user on the project",
      "Attach service accounts to Cloud Run/GKE/GCE resources instead of using key files",
      "Workload Identity eliminates key files in GKE — the most secure Kubernetes option",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 3,
    title: "Deploying Models",
    estimatedMinutes: 12,
    content: `
<h2>Making Claude API Calls Through Vertex AI</h2>
<p>Like Bedrock, Vertex AI offers both a native SDK adapter and a low-level client. The Anthropic SDK adapter is easiest for developers already familiar with the Claude API.</p>

<h3>Using the Anthropic Vertex SDK</h3>
<pre><code>import anthropic

client = anthropic.AnthropicVertex(
    project_id="my-project-id",
    region="us-central1"
    # Credentials from ADC automatically
)

message = client.messages.create(
    model="claude-sonnet-4-5@20251001",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello from Vertex AI!"}]
)
print(message.content[0].text)</code></pre>

<h3>Using the Vertex AI SDK Directly</h3>
<pre><code>from google.cloud import aiplatform
import json

aiplatform.init(project="my-project-id", location="us-central1")

model = aiplatform.gapic.PredictionServiceClient()
endpoint = f"projects/my-project-id/locations/us-central1/publishers/anthropic/models/claude-sonnet-4-5"

response = model.predict(
    endpoint=endpoint,
    instances=[{
        "anthropic_version": "vertex-2023-10-16",
        "messages": [{"role": "user", "content": "Hello!"}],
        "max_tokens": 1024
    }]
)</code></pre>

<h3>Streaming on Vertex AI</h3>
<p>Streaming works with the Anthropic Vertex adapter using the same interface as the direct API:</p>
<pre><code>with client.messages.stream(
    model="claude-sonnet-4-5@20251001",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a poem."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)</code></pre>

<h3>Multi-region Deployment</h3>
<p>For global applications, deploy to Vertex AI in multiple regions and route traffic to the nearest available region. Use Cloud Load Balancing or a custom routing layer to direct requests based on user location. This reduces latency and provides fallback if one region experiences issues.</p>
`,
    keyTakeaways: [
      "AnthropicVertex client is the easiest path — identical interface to the direct Anthropic API",
      "Credentials from ADC are automatically used — no explicit auth config needed in GCP environments",
      "Streaming uses the same .stream() interface as the direct API",
      "Deploy to multiple Vertex AI regions for global latency reduction and redundancy",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 4,
    title: "Prompt Optimization",
    estimatedMinutes: 10,
    content: `
<h2>Vertex AI-Specific Prompt Techniques</h2>
<p>Prompt engineering principles for Claude on Vertex AI are the same as for the direct API. However, Vertex AI offers additional features that can enhance prompt effectiveness and management at scale.</p>

<h3>Vertex AI Prompt Management</h3>
<p>Vertex AI provides prompt management through the console and API. Store prompts as Vertex AI resources with versioning:</p>
<ul>
  <li>Create prompt templates with variable substitution</li>
  <li>Version prompts independently from application code</li>
  <li>Deploy specific prompt versions to different environments</li>
  <li>Compare prompt performance across versions</li>
</ul>

<h3>Context Caching</h3>
<p>Vertex AI supports context caching for Claude — similar to prompt caching in the direct API. Cache large, reused context (system prompts, reference documents, few-shot examples) to reduce cost and latency on repeated calls. Cache TTL is configurable and cached content is billed at a reduced rate.</p>

<h3>Grounding with Google Search</h3>
<p>A Vertex AI-specific feature: you can configure Claude to ground its responses in Google Search results. When grounding is enabled, Vertex AI performs a search and includes relevant results in Claude's context automatically. This is useful for applications where current, factual information from the web is important.</p>

<h3>Integration with BigQuery</h3>
<p>Vertex AI's integration with BigQuery enables a powerful pattern: run SQL queries to retrieve relevant data, pass the results to Claude for analysis or summarization, and return structured insights. Claude can also help generate the SQL queries themselves based on natural language questions about your BigQuery datasets.</p>

<h3>Model Evaluation</h3>
<p>Vertex AI Model Evaluation provides tools to systematically evaluate Claude's outputs. Define an evaluation dataset, specify metrics (BLEU, ROUGE, custom rubric scoring), and run evaluations as part of your deployment pipeline. This catches prompt regressions before they reach production.</p>
`,
    keyTakeaways: [
      "Vertex AI Prompt Management provides versioning and template variables for prompt governance",
      "Context caching on Vertex AI reduces cost for repeated large-context calls",
      "Grounding with Google Search automatically includes current web results in Claude's context",
      "Vertex AI Model Evaluation provides systematic prompt regression testing",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 5,
    title: "Monitoring and Cost Management",
    estimatedMinutes: 11,
    content: `
<h2>Observability and Cost Control on Vertex AI</h2>
<p>Production Vertex AI deployments require visibility into usage, performance, and costs. Google Cloud's observability tooling integrates natively with Vertex AI.</p>

<h3>Cloud Monitoring</h3>
<p>Vertex AI automatically publishes metrics to Cloud Monitoring:</p>
<ul>
  <li>Prediction request count and latency</li>
  <li>Error rates by status code</li>
  <li>Token throughput</li>
</ul>
<p>Create dashboards and alerts in Cloud Monitoring to track these metrics. Set alerts on error rate spikes or latency degradation to catch issues before they affect users.</p>

<h3>Cloud Logging</h3>
<p>Enable Vertex AI audit logging in Cloud Logging to track all API calls. Log structured data from your application including:</p>
<ul>
  <li>Request ID and model ID</li>
  <li>Input and output token counts</li>
  <li>End-to-end latency</li>
  <li>User or session identifiers (anonymized)</li>
</ul>
<p>Use Log-based metrics to create custom monitoring metrics from log data.</p>

<h3>Cost Monitoring with Billing</h3>
<p>Vertex AI Claude usage appears in GCP billing as Vertex AI line items. To manage costs:</p>
<ul>
  <li>Set budget alerts in GCP Billing to be notified before exceeding budgets</li>
  <li>Use billing labels on projects to attribute costs to teams or features</li>
  <li>Export billing data to BigQuery for detailed cost analysis</li>
  <li>Monitor token usage per model to identify optimization opportunities</li>
</ul>

<h3>Quota Management</h3>
<p>Vertex AI enforces per-minute and per-day quotas on Claude API calls. View current quotas and request increases in the GCP Console under APIs &amp; Services → Quotas. For production launches, request quota increases proactively — approval takes 1–3 business days.</p>

<h3>Cost Optimization Strategies</h3>
<ul>
  <li>Use Haiku for high-volume, simpler tasks (classification, extraction)</li>
  <li>Enable context caching for repeated large prompts</li>
  <li>Implement request batching where possible</li>
  <li>Right-size max_tokens — avoid over-allocating</li>
</ul>
`,
    keyTakeaways: [
      "Cloud Monitoring auto-publishes Vertex AI metrics; set alerts on error rate and latency",
      "Enable Vertex AI audit logging for a complete record of all API calls",
      "Set GCP budget alerts proactively; export billing to BigQuery for detailed cost analysis",
      "Request quota increases before production launches — approval takes 1–3 business days",
    ],
  },
  {
    courseSlug: "claude-with-google-vertex",
    moduleIndex: 6,
    title: "Building Scalable Applications",
    estimatedMinutes: 13,
    content: `
<h2>Production Architecture Patterns on GCP</h2>
<p>This module covers the architectural patterns that make Claude on Vertex AI applications scalable, reliable, and maintainable.</p>

<h3>Cloud Run Pattern</h3>
<p>Cloud Run is the simplest production deployment for most Vertex AI applications — fully managed, auto-scaling, and serverless:</p>
<pre><code># Dockerfile for a Cloud Run Claude service
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install anthropic[vertex] flask
COPY . .
CMD ["python", "app.py"]</code></pre>
<p>Deploy with a service account that has the aiplatform.user role. Cloud Run auto-scales to zero when idle and handles traffic spikes automatically.</p>

<h3>Pub/Sub for Async Processing</h3>
<p>For high-volume, latency-tolerant workloads, decouple request intake from Vertex AI calls using Cloud Pub/Sub:</p>
<ul>
  <li>API endpoint publishes messages to a Pub/Sub topic</li>
  <li>Cloud Run subscribers pull messages and call Vertex AI</li>
  <li>Results stored in Firestore or Cloud SQL</li>
  <li>Webhook or polling for result retrieval</li>
</ul>
<p>This architecture handles burst traffic without overwhelming Vertex AI quotas.</p>

<h3>Vertex AI Pipelines for Complex Workflows</h3>
<p>For multi-step AI pipelines (data ingestion → preprocessing → Claude inference → postprocessing → storage), Vertex AI Pipelines (built on KFP) provides orchestration with retry logic, parallelism, and monitoring. Each step can be containerized independently and scaled as needed.</p>

<h3>GKE for High-Performance Workloads</h3>
<p>For applications needing fine-grained control, persistent connections, or custom networking, GKE with Workload Identity provides a powerful platform. Use GKE Autopilot for ease of management or Standard mode for maximum control. Deploy the Anthropic Vertex client as a sidecar or as a dedicated inference microservice.</p>

<h3>Multi-region Resilience</h3>
<p>Deploy Cloud Run services in multiple regions behind a Global HTTP Load Balancer. Configure health checks on your Vertex AI endpoints — if a region's quota is exhausted or the endpoint is degraded, traffic automatically fails over to another region. Use Cloud Armor for DDoS protection on the load balancer.</p>
`,
    keyTakeaways: [
      "Cloud Run is the simplest production deployment — serverless, auto-scaling, service account auth",
      "Pub/Sub decoupling handles burst traffic without overwhelming Vertex AI quotas",
      "Vertex AI Pipelines orchestrates multi-step AI workflows with retries and parallelism",
      "Multi-region Cloud Run with Global Load Balancer provides automatic failover",
    ],
  },
];

export default lessons;
