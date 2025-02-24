import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), '..', 'CONTEXT_MANAGEMENT.md');

  if (!fs.existsSync(filePath)) {
    console.error(`Context management file not found at ${filePath}`);
    return res.status(500).json({ error: 'Context management file not found in root directory' });
  }

  if (req.method === 'GET') {
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      console.log('File content read successfully');
      
      const sessions = [];
      const sessionBlocks = fileContent.split(/(?=## Session \d+)/);
      
      for (const block of sessionBlocks) {
        const trimmedBlock = block.trim();
        
        if (!trimmedBlock.startsWith('## Session')) {
          continue;
        }
        
        const titleMatch = trimmedBlock.match(/## Session (\d+) - ([^\n]+)/);
        if (!titleMatch) continue;
        
        const [_, sessionNumber, date] = titleMatch;
        
        const overviewMatch = trimmedBlock.match(/### Overview\s+([\s\S]*?)(?=\n### |$)/);
        const overview = overviewMatch ? overviewMatch[1].trim() : '';
        
        const tasksMatch = trimmedBlock.match(/### Completed Tasks\s+([\s\S]*?)(?=\n## |$)/);
        const tasks = tasksMatch ? tasksMatch[1].trim() : '';
        
        sessions.push({
          title: `Session ${sessionNumber}`,
          date: date.trim(),
          overview,
          tasks
        });
      }
      
      // Changed sort order to ascending (oldest to newest)
      const sortedSessions = sessions.sort((a, b) => {
        const aNum = parseInt(a.title.split(' ')[1]);
        const bNum = parseInt(b.title.split(' ')[1]);
        return aNum - bNum;
      });
      
      res.status(200).json(sortedSessions);
    } catch (error) {
      console.error('Error reading context file:', error);
      res.status(500).json({ error: 'Failed to read context data: ' + error.message });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { sessionNumber, date, overview, tasks, action } = req.body;
      let fileContent = await fs.promises.readFile(filePath, 'utf8');
      
      if (action === 'create') {
        const newSessionContent = `\n\n## Session ${sessionNumber} - ${date}\n\n### Overview\n${overview}\n\n### Completed Tasks\n${tasks || '1. Initial setup\n   - Ready for task logging'}`;
        fileContent += newSessionContent;
      } 
      else if (action === 'edit') {
        const sessionPattern = new RegExp(`## Session ${sessionNumber} - .*?(?=\n\n## Session|$)`, 'gs');
        const newSessionContent = `## Session ${sessionNumber} - ${date}\n\n### Overview\n${overview}\n\n### Completed Tasks\n${tasks}`;
        fileContent = fileContent.replace(sessionPattern, newSessionContent);
      }
      
      await fs.promises.writeFile(filePath, fileContent, 'utf8');
      
      const updatedContent = await fs.promises.readFile(filePath, 'utf8');
      const sessions = [];
      const sessionBlocks = updatedContent.split(/(?=## Session \d+)/);
      
      for (const block of sessionBlocks) {
        const trimmedBlock = block.trim();
        if (!trimmedBlock.startsWith('## Session')) continue;
        
        const titleMatch = trimmedBlock.match(/## Session (\d+) - ([^\n]+)/);
        if (!titleMatch) continue;
        
        const [_, sessionNumber, date] = titleMatch;
        
        const overviewMatch = trimmedBlock.match(/### Overview\s+([\s\S]*?)(?=\n### |$)/);
        const overview = overviewMatch ? overviewMatch[1].trim() : '';
        
        const tasksMatch = trimmedBlock.match(/### Completed Tasks\s+([\s\S]*?)(?=\n## |$)/);
        const tasks = tasksMatch ? tasksMatch[1].trim() : '';
        
        sessions.push({
          title: `Session ${sessionNumber}`,
          date: date.trim(),
          overview,
          tasks
        });
      }
      
      // Changed sort order here too
      const sortedSessions = sessions.sort((a, b) => {
        const aNum = parseInt(a.title.split(' ')[1]);
        const bNum = parseInt(b.title.split(' ')[1]);
        return aNum - bNum;
      });
      
      res.status(200).json(sortedSessions);
    } catch (error) {
      console.error('Error updating context file:', error);
      res.status(500).json({ error: 'Failed to update context data: ' + error.message });
    }
  }
}