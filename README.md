# iCar Wreckers Website

## Project Overview
A modern web application for iCar Wreckers, featuring car valuation, quote management, and market data analysis.

## Tech Stack
- Frontend: Next.js 15.1.7
- Backend: Node.js
- Database: PostgreSQL
- Caching: Redis
- UI Components: shadcn/ui

## Project Structure
```
car-wrecker-project/
├── frontend/          # Next.js frontend application
├── backend/          # Node.js backend server
├── config/           # Configuration files
└── docs/            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Redis

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd car-wrecker-project
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Update the variables with your configuration

5. Start the development servers:

Frontend (Port 8001):
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Development Guidelines

### Git Workflow
1. Create a new branch for each feature/fix:
```bash
git checkout -b feature/feature-name
```

2. Commit your changes:
```bash
git add .
git commit -m "feat: description of changes"
```

3. Push your changes:
```bash
git push origin feature/feature-name
```

4. Create a Pull Request for review

### Commit Message Format
Follow the Conventional Commits specification:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

## Contact
For any questions or issues, please contact the development team.
