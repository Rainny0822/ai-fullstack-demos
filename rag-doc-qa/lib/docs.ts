export type Doc = {
  id: string;
  title: string;
  content: string;
};

/** Sample docs for in-memory mock retrieval */
export const DOCS: Doc[] = [
  {
    id: "onboarding",
    title: "Product Onboarding Guide",
    content:
      "Welcome to Acme. Create an account, invite teammates from Settings → Members, and connect your first data source. The free plan supports up to 3 projects. Billing is monthly; you can upgrade anytime from the Billing page.",
  },
  {
    id: "api-auth",
    title: "API Authentication",
    content:
      "All API requests require a Bearer token in the Authorization header. Generate tokens under Settings → API Keys. Tokens expire after 90 days. Rate limit is 100 requests per minute on the free tier.",
  },
  {
    id: "webhooks",
    title: "Webhooks Overview",
    content:
      "Webhooks notify your server when events occur: invoice.paid, user.created, and project.updated. Configure the endpoint URL and a shared secret. We retry failed deliveries up to 5 times with exponential backoff.",
  },
  {
    id: "privacy",
    title: "Data Retention Policy",
    content:
      "Customer data is retained for the life of the account. Soft-deleted records are purged after 30 days. Audit logs are kept for 1 year. You may export all data via Settings → Export before closing an account.",
  },
];

/** Naive keyword scoring — mock retrieval, not real embeddings */
export function retrieve(query: string, topK = 2): (Doc & { score: number })[] {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2);

  const scored = DOCS.map((doc) => {
    const hay = `${doc.title} ${doc.content}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 1;
    }
    return { ...doc, score };
  })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (scored.length === 0) {
    return DOCS.slice(0, topK).map((d) => ({ ...d, score: 0 }));
  }
  return scored;
}

export function answerFromDocs(query: string, docs: Doc[]): string {
  if (!docs.length) {
    return "No matching documents found in the mock corpus.";
  }
  const snippets = docs
    .map((d, i) => `[${i + 1}] ${d.title}: ${d.content}`)
    .join("\n\n");
  return (
    `Based on the retrieved docs (mock RAG), here's a concise answer to "${query}":\n\n` +
    `The most relevant sources are: ${docs.map((d) => d.title).join("; ")}.\n\n` +
    `Summary from context:\n${docs[0].content}\n\n` +
    `---\nSources:\n${snippets}`
  );
}
