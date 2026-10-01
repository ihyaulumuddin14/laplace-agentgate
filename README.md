# AgentGate Frontend

Frontend application for **AgentGate**, a framework-agnostic AI Guardrail Engine that evaluates AI agent actions before execution.
This repository contains the public marketing website, technical documentation, and the AgentGate Demo Console for the MVP.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Recharts
- MDX
- Biome for linting and formatting
- Zustand
- Tanstack Query

## Run the project

Choose one of the following options.

### Run locally with npm

Requirements:

- Node.js 24
- npm

The repository includes an `.env` file used by the frontend. Set `NEXT_PUBLIC_API_URL` there to the AgentGate API URL you want to use; this value is exposed to the browser and is embedded when the app is built.

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run a local production build instead:

```bash
npm run build
npm run start
```

### Run with Docker Compose

Requirements:

- Docker Engine with Docker Compose v2

Docker Compose reads `NEXT_PUBLIC_API_URL` from `.env` and passes it to the image build. Confirm the value is set before building:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

Build and start the app:

```bash
docker compose up --build -d
```

Open [http://localhost:3000](http://localhost:3000). The container runs the optimized standalone Next.js build and restarts automatically unless stopped.

To view logs or stop the service:

```bash
docker compose logs -f app
docker compose down
```

## Available Scripts

### `npm run dev`

Start the local development server.

### `npm run build`

Build the project for production.

### `npm run start`

Run a previously created production build locally.

### `npm run lint`

Check code quality with Biome.

### `npm run format`

Format the codebase with Biome.

## Project Structure

This project follows a domain-based structure:

- `src/app` contains routes, layouts, and page composition.
- `src/features` contains feature-specific UI and business logic.
- `src/shared` contains reusable components, hooks, providers, utilities, global schemas, and shared types.
- `src/content` contains static MDX documentation.
- `public` contains static assets served by Next.js.

For more complete folder rules and examples, read `.agents/docs/architecture.md`.

## Development Notes

- Use TypeScript strictly.
- Follow the folder rules in `AGENTS.md` before changing code.
- Keep business logic outside `src/app`.
- Keep feature-specific logic inside the corresponding feature module.
- Prefer reusable components from `src/shared`.
- Use mock data until the backend API is available.
- The frontend only consumes `ActionRequest` and `DecisionResponse` from the backend.

## Frontend Scope

This repository includes:

- Landing Page
- Documentation
- AgentGate Demo Console
  - Web Chat
  - Scenario Runner
  - Proposed Action Preview
  - Decision Card
  - Approval Queue
  - Audit Log
  - Risk Dashboard
  - Latency Report

## Out of Scope

The following components are handled by the Data Science (DS) and Data Engineering (DE) teams:

- AgentGate Core
- LLM Planner
- Policy Engine
- Risk Scoring
- Playwright Executor
- API Connectors
- Browser Extension
- MCP / LangGraph Adapters

## Production Notes

The frontend communicates with the AgentGate backend through HTTP APIs and streaming endpoints (when available). During MVP development, mock APIs may be used to enable parallel frontend and backend development.

## Documentation

Technical documentation is written using native MDX and stored under `src/content/docs`.
Shared MDX components are registered through `src/mdx-components.tsx`, allowing documentation pages to use reusable React components such as callouts, tabs, and code blocks.

## State Management

Global UI state is managed using Zustand.
Server data should not be stored in Zustand and should instead be fetched directly from the backend (or mocked during MVP development).
