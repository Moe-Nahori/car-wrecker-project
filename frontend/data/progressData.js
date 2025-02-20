const progressData = {
  "projectTitle": "iCar Wreckers Project Progress",
  "phases": [
    {
      "id": 1,
      "title": "Project Setup and Infrastructure",
      "tasks": [
        {
          "title": "Create project directory structure",
          "completed": true
        },
        {
          "title": "Initialize frontend (Next.js) and backend (Node.js) projects",
          "completed": true
        },
        {
          "title": "Set up configuration files",
          "completed": true
        },
        {
          "title": "Install dependencies",
          "completed": true
        },
        {
          "title": "Set up development environment",
          "completed": true
        },
        {
          "title": "Configure database schema (PostgreSQL)",
          "completed": true
        },
        {
          "title": "Configure caching system (Redis)",
          "completed": true
        },
        {
          "title": "Set up version control (Git)",
          "completed": false
        }
      ]
    },
    {
      "id": 2,
      "title": "Backend Development",
      "sections": [
        {
          "title": "Database Schema Implementation",
          "tasks": [
            {
              "title": "Create Users table",
              "completed": true
            },
            {
              "title": "Create Cars table",
              "completed": true
            },
            {
              "title": "Create Quotes table",
              "completed": true
            },
            {
              "title": "Create MarketData table",
              "completed": true
            }
          ]
        },
        {
          "title": "Cache Layer Implementation",
          "tasks": [
            {
              "title": "Redis configuration and connection",
              "completed": true
            },
            {
              "title": "Cache utility functions",
              "completed": true
            },
            {
              "title": "Caching middleware for API routes",
              "completed": true
            },
            {
              "title": "Cache invalidation strategies",
              "completed": true
            }
          ]
        }
      ]
    }
  ]
};

export default progressData;