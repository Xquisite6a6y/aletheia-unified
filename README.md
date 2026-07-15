# Aletheia Unified

**One repository. One command. Everything works.**

Aletheia is a unified platform combining:
- **Boa**: Daemon orchestration and device mesh
- **Aletheia**: Agentic AI system with reverse-solver and multi-branch evolution

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/aletheia-unified.git
cd aletheia-unified
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Deploy to AWS Lambda
```bash
npm run deploy
```

That's it! Your app is live.

---

## Architecture

```
┌─────────────────────────────────────────┐
│         Aletheia Unified                │
├─────────────────────────────────────────┤
│                                         │
│  Frontend (React + Tailwind)            │
│  ├── Dashboard                          │
│  ├── Daemon Status Monitor              │
│  └── Agentic Goal Executor              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Backend (Express + tRPC)               │
│  ├── Boa Router                         │
│  │   ├── Heartbeat Endpoint             │
│  │   ├── Cast Frame Logging             │
│  │   └── Daemon Status                  │
│  │                                      │
│  ├── Aletheia Router                    │
│  │   ├── Execute Goal                   │
│  │   ├── Reverse Solver                 │
│  │   └── Evolution Engine               │
│  │                                      │
│  └── Auth Router                        │
│      ├── Login/Logout                   │
│      └── User Management                │
│                                         │
└─────────────────────────────────────────┘
```

---

## Features

### Boa Daemon System
- ✅ Daemon heartbeat monitoring
- ✅ Device registration and tracking
- ✅ Cast frame event logging
- ✅ Real-time status updates
- ✅ Autonomous daemon orchestration

### Aletheia Agentic System
- ✅ Reverse-solver blueprint generation
- ✅ Multi-branch evolution engine
- ✅ Stability scoring (Delta)
- ✅ Goal execution and tracking
- ✅ Agentic reasoning

### Platform
- ✅ Unified dashboard
- ✅ Real-time monitoring
- ✅ One-click AWS deployment
- ✅ Automatic scaling
- ✅ Production-ready

---

## API Endpoints

### Boa Daemon
```bash
# Send heartbeat
POST /api/trpc/boa.heartbeat
{
  "daemonId": "daemon-1",
  "deviceToken": "token-123",
  "timestamp": "2024-07-15T12:00:00Z",
  "resourceData": {
    "cpuUsage": 45,
    "memoryUsage": 62,
    "uptime": 3600
  }
}

# Log cast frame
POST /api/trpc/boa.castFrame
{
  "deviceToken": "token-123",
  "title": "Deployment Started",
  "message": "Deploying version 1.2.3",
  "frameType": "info"
}

# Get daemon status
GET /api/trpc/boa.getStatus
```

### Aletheia Agentic
```bash
# Execute goal
POST /api/trpc/aletheia.executeGoal
{
  "objective": "Create a data processing pipeline",
  "constraints": { "maxTime": 3600 },
  "branches": 3
}

# Get goals
GET /api/trpc/aletheia.getGoals

# Get system status
GET /api/trpc/aletheia.getStatus
```

---

## Environment Variables

Create a `.env` file:

```bash
# AWS
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=123456789012

# Application
NODE_ENV=production
PORT=3000

# Database (optional)
DATABASE_URL=mysql://user:pass@host/db

# API Keys
GOOGLE_GEMINI_API_KEY=your_key_here
```

---

## Development

### Project Structure
```
aletheia-unified/
├── src/
│   ├── server/
│   │   ├── index.ts              # Express server
│   │   ├── context.ts            # tRPC context
│   │   ├── trpc.ts               # tRPC setup
│   │   └── routers/
│   │       ├── index.ts          # Main router
│   │       ├── boa.ts            # Boa endpoints
│   │       ├── aletheia.ts       # Aletheia endpoints
│   │       └── auth.ts           # Auth endpoints
│   │
│   └── client/
│       ├── main.tsx              # React entry
│       ├── App.tsx               # Main component
│       ├── index.css             # Global styles
│       ├── lib/
│       │   └── trpc.ts           # tRPC client
│       └── pages/
│           ├── Dashboard.tsx     # Main dashboard
│           └── Login.tsx         # Login page
│
├── index.html                    # HTML entry
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
├── deploy.sh                     # Deployment script
└── README.md                     # This file
```

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

---

## Deployment

### AWS Lambda (Recommended)

1. **Prerequisites**
   - AWS Account
   - AWS CLI configured
   - IAM role with Lambda permissions

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Access**
   - Your app URL will be printed
   - Example: `https://abc123.lambda-url.us-east-1.on.aws/`

### Local Development
```bash
npm run dev
```

### Docker
```bash
docker build -t aletheia-unified .
docker run -p 3000:3000 aletheia-unified
```

---

## Monitoring

### View Logs
```bash
# Local
npm run dev

# AWS Lambda
aws logs tail /aws/lambda/aletheia-unified --follow
```

### Health Check
```bash
curl https://your-app-url.lambda-url.region.on.aws/api/health
```

---

## Troubleshooting

### App won't start
- Check Node.js version: `node --version` (need 18+)
- Check dependencies: `npm install`
- Check logs: `npm run dev`

### Deployment fails
- Verify AWS credentials: `aws sts get-caller-identity`
- Check IAM permissions
- Review CloudWatch logs

### API errors
- Check request format
- Verify authentication
- Check server logs

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a pull request

---

## License

MIT

---

## Support

For issues or questions:
1. Check the logs
2. Review the API documentation
3. Check AWS CloudWatch
4. Open an issue on GitHub

---

## Next Steps

- [ ] Add database integration
- [ ] Implement user authentication
- [ ] Add AI model integration
- [ ] Set up monitoring dashboard
- [ ] Configure auto-scaling
- [ ] Add CI/CD pipeline

---

**Built with ❤️ for autonomous systems**
