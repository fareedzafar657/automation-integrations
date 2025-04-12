# Event Tracker

A Next.js application that receives event participant data from Slack via Zapier, stores it, and displays it in a clean dashboard interface.

## Features

- 📊 Dashboard overview of events
- 👥 Detailed participant listings
- 🔄 API endpoint for receiving data from Slack/Zapier
- 💾 Data storage with Prisma (configurable for different databases)
- 🌓 Dark/light mode support

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (recommended)

## Local Development Setup

### Prerequisites

- Node.js 18.x or later
- Docker and Docker Compose (for local PostgreSQL)

### Installation Steps

1. **Clone the repository**

   \`\`\`bash
   git clone https://github.com/yourusername/event-tracker.git
   cd event-tracker
   \`\`\`

2. **Install dependencies**

   \`\`\`bash
   npm install
   \`\`\`

3. **Start the local PostgreSQL database**

   \`\`\`bash
   docker-compose up -d
   \`\`\`

   This will start a PostgreSQL instance on port 5432.

4. **Set up environment variables**

   Copy the example environment file:

   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

5. **Initialize the database**

   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

6. **Start the development server**

   \`\`\`bash
   npm run dev
   \`\`\`

7. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Switching Between Local and Production Databases

The application is configured to use environment variables to determine which database to connect to:

- For local development, it uses the PostgreSQL database running in Docker
- For production, it uses the Supabase PostgreSQL database on Vercel

When deploying to Vercel, make sure all the required environment variables are set in your Vercel project settings.

## Deployment

### Deploying to Vercel

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure project settings with your Supabase environment variables
   - Click "Deploy"

3. **Verify database connection**

   After deployment, check the logs to ensure the application is connecting to your Supabase PostgreSQL database correctly.

## API Documentation

### POST /api/slack-event

Endpoint for receiving participant data from Slack via Zapier.

**Request Body:**

\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1234567890"
}
\`\`\`

**Required Fields:**
- `name`: Participant's full name
- `email`: Participant's email address
- `username`: Participant's username

**Optional Fields:**
- `phone`: Participant's phone number

**Response:**

Success (201 Created):
\`\`\`json
{
  "id": "clq1234abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1234567890",
  "appliedDate": "2023-04-12T12:34:56.789Z"
}
\`\`\`

## License

MIT
