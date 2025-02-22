import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), '..', 'CONTEXT_MANAGEMENT.md');

  if (req.method === 'GET') {
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const sessions = parseMarkdownSessions(fileContent);
      res.status(200).json(sessions);
    } catch (error) {
      console.error('Error reading context file:', error);
      res.status(500).json({ error: 'Failed to read context data' });
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
      const updatedSessions = parseMarkdownSessions(fileContent);
      res.status(200).json(updatedSessions);
    } catch (error) {
      console.error('Error updating context file:', error);
      res.status(500).json({ error: 'Failed to update context data' });
    }
  }
}

function parseMarkdownSessions(markdown) {
  const sessions = [];
  const sessionRegex = /## Session (\d+) - (.*?)\n\n### Overview\n(.*?)\n\n### Completed Tasks\n(.*?)(?=\n\n## Session|$)/gs;
  
  let match;
  while ((match = sessionRegex.exec(markdown)) !== null) {
    sessions.push({
      title: `Session ${match[1]}`,
      date: match[2],
      overview: match[3].trim(),
      tasks: match[4].trim()
    });
  }

  return sessions.sort((a, b) => {
    const aNum = parseInt(a.title.split(' ')[1]);
    const bNum = parseInt(b.title.split(' ')[1]);
    return aNum - bNum;
  });
}