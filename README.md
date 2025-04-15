# Claravista Test

This is a full-stack application consisting of:

- Frontend (Next)
- Backend (Node.js)
- MongoDB Database

## Prerequisites

Before running this project, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/claravista-test.git
cd claravista-test
```

2. Set up environment variables:

   - Create a `.env` file in the root of `backend` directory
   - Create a `.env` file in the root of `frontend` directory
   - You can use the example environment variables from `.env.example` files in both directories as a reference

3. Install the dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

4. Start the application using Docker Compose:

```bash
docker compose up --build -d
```

This command will:

- Build all necessary Docker images
- Start the containers in detached mode
- Set up the MongoDB database
- Start the backend server
- Start the frontend application

The application should now be running and accessible at:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## Stopping the Application

To stop the application, run:

```bash
docker compose down
```

## Project Structure

```
claravista-test/
├── frontend/          # Next.js frontend application
│   ├── .env          # Frontend environment variables
│   └── .env.example  # Example frontend environment variables
├── backend/          # Node.js backend server
│   ├── .env         # Backend environment variables
│   └── .env.example # Example backend environment variables
└── docker-compose.yml # Docker Compose configuration
```
