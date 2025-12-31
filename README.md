# n8n Kling AI to YouTube Automation

Automated daily video generation using Kling AI and automatic posting to YouTube using n8n workflow automation.

## Features

- 🎬 **Automated Video Generation**: Uses Kling AI to generate high-quality videos daily
- 📺 **YouTube Integration**: Automatically uploads videos to your YouTube channel
- ⏰ **Daily Scheduling**: Runs automatically every day at 9 AM
- 🔄 **Status Monitoring**: Real-time workflow status tracking
- 📊 **Execution History**: View past workflow executions and results
- 🎨 **Beautiful UI**: Modern, responsive dashboard built with Next.js and Tailwind CSS

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials.

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the dashboard.

### 4. Import n8n Workflow

1. Download the workflow JSON from the dashboard
2. Import the workflow in n8n
3. Configure credentials (Kling AI + YouTube)
4. Activate the workflow

## Deployment

```bash
vercel deploy --prod
```

## License

MIT License
