# super.mesthi.com

Internal Mesthi platform operator console.

## Scope

- React + Vite + TypeScript + Windi CSS
- Authenticated bearer adapter for the current `api.mesthi.com` boundary
- Read-mostly C4 operations: health, workspaces, agents, tasks
- Capacity, plans and subscriptions are intentionally contract-ready placeholders until C4.5/C4.6 backend admin/RBAC/billing APIs exist
- No Git Broker, GitHub App, execution, Kubernetes or model-provider secrets are exposed to the browser

## Development

```bash
cp .env.example .env
npm install
npm run dev
```

## Production

Set:

```bash
VITE_MESTHI_API_URL=https://api.mesthi.com
VITE_MESTHI_API_VERSION=1.12.2
npm run build
```

Serve `dist/` behind `https://super.mesthi.com`.

## Security note

The current sign-in form is an interim C4.5 bearer-token adapter stored in `sessionStorage` only. Production target is a server-managed authenticated `super_admin` session with RBAC/MFA and protected Swagger/OpenAPI endpoints. Backend authorization remains mandatory; UI guards are not an authorization boundary.
