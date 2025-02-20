import fs from 'fs/promises';
import path from 'path';

function convertPhasesToMarkdown(phases) {
  let markdown = '# iCar Wreckers Project Progress\n\n';

  phases.forEach(phase => {
    markdown += `## Phase ${phase.id}: ${phase.title}\n`;

    // Handle direct tasks
    if (phase.tasks) {
      phase.tasks.forEach(task => {
        markdown += `- [${task.completed ? 'x' : ' '}] ${task.title}\n`;
      });
      markdown += '\n';
    }

    // Handle sections
    if (phase.sections) {
      phase.sections.forEach(section => {
        markdown += `- ${section.title}\n`;
        section.tasks.forEach(task => {
          markdown += `  - [${task.completed ? 'x' : ' '}] ${task.title}\n`;
        });
        markdown += '\n';
      });
    }
  });

  // Add environment details
  markdown += `### Environment Details\n`;
  markdown += `- Database URL: postgresql://postgres:duckling@localhost:5432/car_wreckers\n`;
  markdown += `- Frontend: Next.js 15.1.7 (Port 8001)\n`;
  markdown += `- Backend: Node.js with Express (Port 8005)\n`;
  markdown += `- Redis: localhost:6379\n`;
  markdown += `- ORM: Sequelize\n\n`;
  markdown += `Note: This progress tracker is being actively updated as the project moves forward. Each task will be marked as completed [x] when finished.`;

  return markdown;
}

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phases } = req.body;
    
    if (!phases) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: 'Phases data is required' });
    }

    // Get project root directory (two levels up from api/progress directory)
    const projectRoot = path.join(process.cwd(), '..', '..');
    
    // Update PROJECT_PROGRESS.md
    const mdFilePath = path.join(projectRoot, 'PROJECT_PROGRESS.md');
    await fs.writeFile(mdFilePath, convertPhasesToMarkdown(phases), 'utf8');

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Update progressData.js
    const progressData = {
      projectTitle: 'iCar Wreckers Project Progress',
      phases
    };
    
    const progressDataContent = `const progressData = ${JSON.stringify(progressData, null, 2)};\n\nexport default progressData;`;
    const progressDataPath = path.join(dataDir, 'progressData.js');
    await fs.writeFile(progressDataPath, progressDataContent, 'utf8');

    // Set content type and return success response
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    // Set content type and return error response
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: 'Failed to update progress',
      message: error.message,
      details: error.stack
    });
  }
}