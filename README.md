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
- **Database**: Prisma ORM (configurable)
- **Deployment**: Vercel (recommended)

## Local Development Setup

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation Steps

1. **Clone the repository**

   \`\`\`bash
   git clone https://github.com/yourusername/event-tracker.git
   cd event-tracker
   \`\`\`

2. **Install dependencies**

   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up the database**

   The application is configured to use SQLite by default for local development.

   \`\`\`bash
   # Initialize Prisma
   npx prisma generate

   # Create the database
   npx prisma db push
   \`\`\`

4. **Start the development server**

   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure project settings (environment variables if needed)
   - Click "Deploy"

3. **Configure the database**

   For production, you'll likely want to use a more robust database like PostgreSQL:

   - Create a database on a provider like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)
   - Get your database connection string
   - Add it as an environment variable in Vercel:
     - Name: `DATABASE_URL`
     - Value: Your connection string

   - Update your `prisma/schema.prisma` file:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     \`\`\`

   - Run database migrations:
     \`\`\`bash
     npx prisma migrate deploy
     \`\`\`

### Environment Variables

- `DATABASE_URL`: Your database connection string (required for production)
- `NEXTAUTH_SECRET`: (Optional) If you add authentication later

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

Error (400 Bad Request):
\`\`\`json
{
  "error": "Missing required fields"
}
\`\`\`

## Zapier Integration

### Setting Up the Webhook

1. **Create a new Zap in Zapier**
2. **Choose Slack as your trigger app** (e.g., "New Channel Message")
3. **Add an Action step** and select "Webhooks by Zapier"
4. **Choose "POST" as the action**
5. **Configure the webhook with these settings**:

   - **URL**: `https://your-deployed-app.com/api/slack-event`
   - **Payload Type**: `JSON`
   - **Data**: Map the Slack fields to this JSON structure:

   \`\`\`json
   {
     "name": "{{full_name}}",
     "email": "{{email}}",
     "username": "{{username}}",
     "phone": "{{phone_number}}"
   }
   \`\`\`

   Replace the values in `{{}}` with the actual field names from your Slack trigger.

6. **Headers**: Add a header with `Content-Type` set to `application/json`
7. **Test the Zap** to ensure it's working correctly

## License

MIT
