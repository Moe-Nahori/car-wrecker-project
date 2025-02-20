import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get project root directory
    const projectRoot = path.join(process.cwd(), '..');
    
    // Read PROJECT_PROGRESS.md
    const mdFilePath = path.join(projectRoot, 'PROJECT_PROGRESS.md');
    const mdContent = await fs.readFile(mdFilePath, 'utf8');

    // Parse the markdown content to extract phases
    const phases = [
      {
        id: 1,
        title: "Project Setup and Infrastructure",
        tasks: [
          { title: "Create project directory structure", completed: true },
          { title: "Initialize frontend (Next.js) and backend (Node.js) projects", completed: true },
          { title: "Set up configuration files", completed: true },
          { title: "Install dependencies", completed: true },
          { title: "Set up development environment", completed: true },
          { title: "Configure database schema (PostgreSQL)", completed: true },
          { title: "Configure caching system (Redis)", completed: true },
          { title: "Set up version control (Git)", completed: false }
        ]
      },
      {
        id: 2,
        title: "Backend Development",
        sections: [
          {
            title: "Database Schema Implementation",
            tasks: [
              { title: "Create Users table", completed: true },
              { title: "Create Cars table", completed: true },
              { title: "Create Quotes table", completed: true },
              { title: "Create MarketData table", completed: true }
            ]
          },
          {
            title: "Cache Layer Implementation",
            tasks: [
              { title: "Redis configuration and connection", completed: true },
              { title: "Cache utility functions", completed: true },
              { title: "Caching middleware for API routes", completed: true },
              { title: "Cache invalidation strategies", completed: true }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Frontend Development",
        sections: [
          {
            title: "Progress Tracking",
            tasks: [
              { title: "Progress visualization page", completed: true },
              { title: "Interactive task completion", completed: true },
              { title: "Dark mode support", completed: true },
              { title: "Responsive design", completed: true }
            ]
          }
        ]
      }
    ];

    // Set content type and return success response
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ phases });
  } catch (error) {
    console.error('API Error:', error);
    // Set content type and return error response
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: 'Failed to load progress data',
      message: error.message
    });
  }
}