import { NextRequest, NextResponse } from "next/server";

const MOCK_SUGGESTIONS: Record<string, string> = {
  t1: `Hi Alice,

Thank you for reaching out. I understand how frustrating login issues can be. Let's get this resolved for you.

I've checked your account and noticed that your password was recently changed. If you haven't made this change, please try resetting your password using the "Forgot Password" link on the login page.

Additionally, please ensure that:
- You're not using autofill (sometimes it can use outdated credentials)
- Caps Lock is off
- You're using the correct email address

If the issue persists after resetting your password, please reply to this ticket and I'll escalate to our technical team.

Best regards,
Support Team`,

  t2: `Hi Bob,

Thank you for bringing this to our attention. I've reviewed invoice #1234 and would be happy to explain the charges.

The invoice includes:
- Base subscription: $99.00
- Additional user licenses (3): $30.00
- Premium support upgrade: $49.00
- Total: $178.00

The premium support upgrade was activated on your account last month, which may explain the difference from your previous invoices.

If you'd like to review or modify your plan, I can help you with that. Would you like me to schedule a quick call to discuss your subscription options?

Best regards,
Support Team`,

  t3: `Hi Charlie,

Thank you for the kind words and the feature suggestion! We really appreciate feedback from users like you.

Dark mode is indeed on our roadmap! Our design team is currently working on it, and we're planning to roll it out in Q2. I've added your request to the feature tracker, which helps us prioritize development.

In the meantime, if you're using Chrome or Edge, you might find browser extensions that can apply dark mode to websites helpful.

I'll make sure to notify you when dark mode is released!

Best regards,
Support Team`,

  t4: `URGENT: Payment Gateway Issue

Hi Dana,

Thank you for the immediate notification. I've escalated this to our on-call engineering team with highest priority.

Current status:
- Issue confirmed: Payment processing experiencing intermittent failures
- Engineering team actively investigating
- Estimated resolution time: 30-60 minutes
- Workaround: Manual payment processing available upon request

I will provide updates every 15 minutes until resolved. You can also monitor our status page at status.example.com.

For immediate assistance with manual payment processing, please call our emergency hotline at 1-800-XXX-XXXX.

Incident ID: #INC-2024-001

Best regards,
Priority Support Team`,

  t5: `Hi Eve,

Great question! I can definitely help you export your data.

To export your project data to CSV:
1. Navigate to your project dashboard
2. Click the "⋮" menu button in the top right
3. Select "Export Data"
4. Choose "CSV format"
5. Click "Download Export"

The export will include all your project information, tasks, and metadata. The process usually takes a few seconds for most projects.

Note: If you have a large dataset (10,000+ records), the export may take a few minutes. You'll receive an email with the download link once it's ready.

Let me know if you need any other format or have trouble finding the export option!

Best regards,
Support Team`,

  t6: `Hi Frank,

Thank you for reaching out regarding API rate limits. Let's find the best solution for your needs.

Current rate limit analysis:
- Your current tier: Standard (1,000 requests/hour)
- Peak usage detected: ~950 requests/hour
- You're approaching your limit during peak hours

I recommend two options:

1. **Upgrade to Professional tier** ($99/month)
   - 5,000 requests/hour
   - Better suited for production workloads

2. **Optimize request patterns**
   - Implement request batching
   - Use webhooks instead of polling
   - Cache responses where appropriate

I can set up a call with our API team to discuss optimization strategies, or I can help you upgrade to the Professional tier right away.

Which option would work best for your use case?

Best regards,
Support Team`,
};

const DEFAULT_SUGGESTION = `Thank you for contacting support. I've reviewed your ticket and our team will provide a detailed response shortly.

In the meantime, you might find our help center useful: help.example.com

We typically respond to tickets within 4-24 hours depending on priority level.

Best regards,
Support Team`;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ticketId = typeof body.ticketId === "string" ? body.ticketId : "";

  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

  const suggestion = MOCK_SUGGESTIONS[ticketId] || DEFAULT_SUGGESTION;

  return NextResponse.json({ suggestion });
}
