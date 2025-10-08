# Nest.js Boilerplate

A production-ready Nest.js boilerplate with ESLint, Husky, and health check service.

## Features

- 🚀 **Nest.js Framework** - Modern, scalable Node.js framework
- 🔧 **ESLint & Prettier** - Code quality and formatting
- 🐕 **Husky** - Git hooks for code quality
- 🏥 **Health Check Service** - Application monitoring endpoints
- 🧪 **Jest Testing** - Unit and e2e testing setup
- 📦 **TypeScript** - Type-safe development

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Nest.Js-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up Husky:
```bash
npm run prepare
```

### Development

Start the development server:
```bash
npm run start:dev
```

The application will be available at `http://localhost:3000/api`

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Health Check Endpoints

The application includes comprehensive health check endpoints:

- `GET /api/health` - Complete health check (application, database, external services)
- `GET /api/health/ready` - Readiness probe (application + database)
- `GET /api/health/live` - Liveness probe (application only)

### Health Check Response

```json
{
  "status": "ok",
  "info": {
    "application": {
      "status": "up",
      "message": "Application is running",
      "timestamp": "2023-12-01T10:00:00.000Z",
      "uptime": 123.45
    },
    "database": {
      "status": "up",
      "message": "Database connection is healthy",
      "timestamp": "2023-12-01T10:00:00.000Z"
    },
    "external-services": {
      "status": "up",
      "message": "External services are accessible",
      "timestamp": "2023-12-01T10:00:00.000Z"
    }
  }
}
```

## Code Quality

This boilerplate includes:

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks that run linting and formatting
- **lint-staged** - Run linters on staged files only

### Pre-commit Hooks

Before each commit, the following checks are automatically run:
- ESLint with auto-fix
- Prettier formatting

## Project Structure

```
src/
├── health/
│   ├── health.controller.ts    # Health check endpoints
│   ├── health.service.ts       # Health check logic
│   └── health.service.spec.ts  # Health service tests
├── app.module.ts              # Main application module
└── main.ts                    # Application entry point
test/
└── health.e2e-spec.ts         # E2E tests for health endpoints
```

## Customization

### Adding New Health Checks

1. Extend the `HealthService` class:
```typescript
async checkCustomService(key: string): Promise<HealthIndicatorResult> {
  // Your custom health check logic
}
```

2. Add the check to the health controller:
```typescript
@Get()
@HealthCheck()
check() {
  return this.health.check([
    () => this.healthService.isHealthy('application'),
    () => this.healthService.checkDatabase('database'),
    () => this.healthService.checkExternalServices('external-services'),
    () => this.healthService.checkCustomService('custom-service'), // Add your check
  ]);
}
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Docker Support

To add Docker support, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License
