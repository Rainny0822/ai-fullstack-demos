# SaaS Usage & Billing Console

A production-ready SaaS billing dashboard with usage meters, plan management, invoices, and team administration. Built with Next.js, TypeScript, Recharts, and Zustand.

## Features

- **Overview Dashboard**: Current plan, billing cycle, usage meters with progress bars
- **Plans & Pricing**: Compare plans with feature lists and upgrade options
- **Usage Tracking**: Detailed usage metrics with charts and warnings
- **Invoice Management**: View and download past invoices
- **Team Administration**: Manage team members with role-based permissions
- **Role-Aware UI**: Different capabilities for owners, admins, and members
- **Mock Stripe Integration**: Ready to connect to real payment APIs

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State**: Zustand for global billing state
- **Validation**: Zod schemas for type safety
- **Charts**: Recharts for usage visualization
- **UI**: Tailwind CSS

### Project Structure
```
saas-usage-billing/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main console with routing
│   └── globals.css      # Global styles
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Overview.tsx     # Dashboard overview
│   ├── Plans.tsx        # Plan comparison
│   ├── Usage.tsx        # Usage details
│   ├── UsageChart.tsx   # Recharts line chart
│   ├── Invoices.tsx     # Invoice table
│   └── Team.tsx         # Team management
├── lib/
│   ├── types.ts         # TypeScript interfaces + Zod schemas
│   ├── store.ts         # Zustand store
│   └── mockData.ts      # Mock plans, invoices, usage data
└── README.md
```

### Role-Based Access Control

The demo includes three user roles with different permissions:

1. **Owner**: Full access to all features and billing
2. **Admin**: Manage team, change plans, view billing
3. **Member**: Use product features, view usage (read-only billing)

UI elements are conditionally rendered based on role (see `Plans.tsx` and `Team.tsx`).

### Data Models

**Plan**: Tier, price, interval, features, limits  
**Subscription**: Status, billing cycle, cancellation flag  
**UsageMeter**: Current usage, limit, reset date  
**Invoice**: Amount, status, line items, PDF link  
**TeamMember**: Name, email, role, joined date

See `lib/types.ts` for complete schemas.

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd demos/saas-usage-billing
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Usage

1. **Dashboard**: View current plan, billing cycle, and usage at a glance
2. **Plans**: Compare and upgrade between Free, Starter, Pro, and Enterprise
3. **Usage**: Monitor API calls, storage, and team members with trend charts
4. **Invoices**: Browse past invoices and download PDFs
5. **Team**: Invite and manage team members (owners/admins only)

## Mock Data

All data is mock and stored in `lib/mockData.ts`:
- 4 plans (Free, Starter, Pro, Enterprise)
- 3 usage meters (API Calls, Storage, Team Members)
- Past invoices with paid status
- Sample team members with different roles
- 10-day usage trend data

## Production Integration

To make this production-ready:

1. **Replace Mock Data**: Connect to your database (Postgres, MongoDB, etc.)
2. **Add Stripe**: Use Stripe SDK for real subscriptions and payments
3. **API Routes**: Create Next.js API routes for billing operations
4. **Authentication**: Add NextAuth.js or Clerk for user auth
5. **Webhooks**: Handle Stripe webhooks for invoice and subscription events
6. **PDF Generation**: Use react-pdf or Stripe-hosted invoices

### Example API Route Structure
```
app/api/
├── billing/
│   ├── plans/route.ts
│   ├── subscription/route.ts
│   └── upgrade/route.ts
├── usage/
│   └── meters/route.ts
├── invoices/
│   └── route.ts
└── webhooks/
    └── stripe/route.ts
```

## Charts

Uses Recharts for usage trend visualization:
- Line chart for API usage over time
- Responsive design with proper axis formatting
- Customizable colors and tooltips

## Security Considerations

For production:
- Validate all role-based operations on the backend
- Use server actions or API routes for mutations
- Implement CSRF protection
- Sanitize user inputs
- Rate-limit API endpoints

## License

MIT
