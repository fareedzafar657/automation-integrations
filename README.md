# Automation Integration

This project is designed for automation integrations, currently featuring two main functionalities:

1. **Slack Event Receiver**: An API endpoint that receives participant data from Slack (via Zapier) and stores it in a Supabase PostgreSQL database.
2. **Webhook Sender**: A feature to create custom fields and send data to any webhook endpoint.

## Features

### 1. Slack Event Receiver
- **Endpoint**: `/api/slack-event`
- **Functionality**:
  - Receives participant data from Slack(It can be any app) via Zapier.
  - Stores the data in a Supabase PostgreSQL database.
- **API Usage**:
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "username": "johndoe",
      "phone": "+1234567890"
    }
    ```
  - **Required Fields**:
    - `name`: Participant's full name
    - `email`: Participant's email address
    - `username`: Participant's username
  - **Optional Fields**:
    - `phone`: Participant's phone number
  - **Response**:
    - **Success (201 Created)**:
      ```json
      {
        "id": "clq1234abcd",
        "name": "John Doe",
        "email": "john@example.com",
        "username": "johndoe",
        "phone": "+1234567890"
      }
      ```

### 2. Webhook Sender
- **Functionality**:
  - Allows the creation of custom fields.
  - Sends data to any webhook endpoint.
- **Use Case**: Automate data delivery to external systems or services via webhooks.

## Getting Started

### Prerequisites
- Node.js
- PNPM (Package Manager)
- Supabase account for database integration

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd slack-events
