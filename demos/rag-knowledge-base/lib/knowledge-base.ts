export type Document = {
  id: string;
  title: string;
  content: string;
  category: string;
  keywords: string[];
};

export const KNOWLEDGE_BASE: Document[] = [
  {
    id: "doc1",
    title: "Getting Started with Next.js",
    category: "Development",
    keywords: ["nextjs", "react", "tutorial", "setup", "installation"],
    content:
      "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations. Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.",
  },
  {
    id: "doc2",
    title: "API Routes in Next.js",
    category: "Development",
    keywords: ["api", "routes", "backend", "endpoints", "serverless"],
    content:
      "API Routes provide a solution to build a public API with Next.js. Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size. API routes can be dynamic, just like regular pages.",
  },
  {
    id: "doc3",
    title: "Understanding RAG Systems",
    category: "AI/ML",
    keywords: ["rag", "retrieval", "ai", "llm", "embeddings", "vector"],
    content:
      "Retrieval-Augmented Generation (RAG) is a technique that enhances large language models by retrieving relevant information from a knowledge base before generating responses. This approach combines the power of semantic search with generative AI, allowing models to provide more accurate and up-to-date answers grounded in specific documents or data sources.",
  },
  {
    id: "doc4",
    title: "Vector Databases Explained",
    category: "AI/ML",
    keywords: ["vector", "database", "embeddings", "similarity", "search"],
    content:
      "Vector databases are specialized databases designed to store and query high-dimensional vectors efficiently. They use approximate nearest neighbor (ANN) algorithms to find similar vectors quickly. Popular vector databases include Pinecone, Weaviate, and Chroma. These databases are essential for implementing semantic search and RAG systems.",
  },
  {
    id: "doc5",
    title: "TypeScript Best Practices",
    category: "Development",
    keywords: ["typescript", "types", "interfaces", "best practices"],
    content:
      "TypeScript is a strongly typed programming language that builds on JavaScript. Best practices include: using strict mode, preferring interfaces over types for object shapes, avoiding 'any' type, using union types effectively, and leveraging type inference. TypeScript helps catch errors at compile time and improves code maintainability.",
  },
  {
    id: "doc6",
    title: "React Server Components",
    category: "Development",
    keywords: ["react", "server components", "rsc", "nextjs", "performance"],
    content:
      "React Server Components allow you to write components that render on the server and stream to the client. They reduce client-side JavaScript bundle size and improve initial page load performance. Server Components can directly access backend resources like databases and file systems without needing API routes.",
  },
  {
    id: "doc7",
    title: "Semantic Search Fundamentals",
    category: "AI/ML",
    keywords: ["semantic", "search", "nlp", "embeddings", "similarity"],
    content:
      "Semantic search goes beyond keyword matching to understand the intent and contextual meaning of search queries. It uses embeddings—numerical representations of text—to capture semantic relationships. Documents and queries are converted to embeddings, and similar items are found by computing cosine similarity or other distance metrics in vector space.",
  },
  {
    id: "doc8",
    title: "Prompt Engineering Guide",
    category: "AI/ML",
    keywords: ["prompts", "llm", "gpt", "ai", "engineering"],
    content:
      "Prompt engineering is the practice of designing effective inputs for large language models to generate desired outputs. Techniques include: being specific and clear, providing examples (few-shot learning), using system messages to set context, breaking complex tasks into steps, and iterating based on results. Good prompts lead to more accurate and useful AI responses.",
  },
  {
    id: "doc9",
    title: "Database Design Principles",
    category: "Database",
    keywords: ["database", "schema", "design", "normalization", "sql"],
    content:
      "Good database design involves normalization to reduce redundancy, proper indexing for performance, defining clear relationships between tables, and choosing appropriate data types. Consider access patterns when designing schemas. Use foreign keys to maintain referential integrity. Plan for scalability and future growth.",
  },
  {
    id: "doc10",
    title: "Authentication with JWT",
    category: "Security",
    keywords: ["jwt", "authentication", "security", "tokens", "auth"],
    content:
      "JSON Web Tokens (JWT) are a secure way to transmit information between parties as a JSON object. JWTs consist of three parts: header, payload, and signature. They're commonly used for authentication—users receive a JWT after login, which they include in subsequent requests. Store JWTs securely (httpOnly cookies are recommended over localStorage) and always verify signatures on the server.",
  },
  {
    id: "doc11",
    title: "CI/CD Pipeline Setup",
    category: "DevOps",
    keywords: ["ci", "cd", "pipeline", "automation", "deployment"],
    content:
      "Continuous Integration and Continuous Deployment (CI/CD) automate the software delivery process. A typical pipeline includes: code commit triggers, automated testing, building artifacts, and deployment to staging/production. Popular tools include GitHub Actions, GitLab CI, and Jenkins. Good pipelines include linting, unit tests, integration tests, and security scans.",
  },
  {
    id: "doc12",
    title: "REST API Design",
    category: "Development",
    keywords: ["rest", "api", "http", "design", "endpoints"],
    content:
      "RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources. Best practices: use nouns for endpoints (not verbs), version your API, use proper status codes (200, 201, 404, 500), implement pagination for lists, support filtering and sorting, and provide clear error messages. Design APIs to be intuitive and consistent.",
  },
];

export function mockSearch(query: string): Document[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter(Boolean);

  const scored = KNOWLEDGE_BASE.map((doc) => {
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    const keywordsLower = doc.keywords.join(" ").toLowerCase();

    let score = 0;

    for (const word of words) {
      if (titleLower.includes(word)) score += 10;
      if (keywordsLower.includes(word)) score += 5;
      if (contentLower.includes(word)) score += 2;
    }

    if (titleLower.includes(lowerQuery)) score += 20;
    if (contentLower.includes(lowerQuery)) score += 10;

    return { doc, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.doc);
}
