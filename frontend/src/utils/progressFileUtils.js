// utils/progressFileUtils.js

const FILE_PATH = 'C:/Users/moena/Desktop/text preprocessor/car-wrecker-project/PROJECT_PROGRESS.md';

// Parse a markdown task line
const parseTaskLine = (line) => {
  const checkboxMatch = line.match(/- \[([ x])\] (.*)/);
  if (checkboxMatch) {
    return {
      completed: checkboxMatch[1] === 'x',
      title: checkboxMatch[2].trim()
    };
  }
  return null;
};

// Parse the markdown content into a structured format
const parseMarkdownContent = (content) => {
  const lines = content.split('\n');
  const phases = [];
  let currentPhase = null;
  let currentCategory = null;

  lines.forEach((line, index) => {
    const phaseMatch = line.match(/^## (Phase \d+: .*)/);
    const categoryMatch = line.match(/^- (.*)/);
    const taskMatch = parseTaskLine(line);

    if (phaseMatch) {
      currentPhase = {
        id: `phase-${phases.length + 1}`,
        title: phaseMatch[1],
        categories: []
      };
      phases.push(currentPhase);
    } else if (categoryMatch && !taskMatch && currentPhase) {
      currentCategory = {
        id: `category-${currentPhase.categories.length + 1}`,
        title: categoryMatch[1],
        tasks: []
      };
      currentPhase.categories.push(currentCategory);
    } else if (taskMatch && currentCategory) {
      currentCategory.tasks.push({
        id: `task-${currentCategory.tasks.length + 1}`,
        ...taskMatch
      });
    }
  });

  return phases;
};

// Convert the structured data back to markdown format
const convertToMarkdown = (phases) => {
  let markdown = '# iCar Wreckers Project Progress\n\n';
  
  phases.forEach(phase => {
    markdown += `## ${phase.title}\n`;
    phase.categories.forEach(category => {
      markdown += `- ${category.title}\n`;
      category.tasks.forEach(task => {
        const checkbox = task.completed ? '[x]' : '[ ]';
        markdown += `  - ${checkbox} ${task.title}\n`;
      });
      markdown += '\n';
    });
  });

  return markdown;
};

// Read and parse the progress file
const readProgressFile = async () => {
  try {
    const response = await fetch('/api/readFile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: FILE_PATH })
    });
    
    if (!response.ok) throw new Error('Failed to read progress file');
    
    const { content } = await response.json();
    return parseMarkdownContent(content);
  } catch (error) {
    console.error('Error reading progress file:', error);
    throw error;
  }
};

// Write updates back to the progress file
const writeProgressFile = async (phases) => {
  try {
    const markdown = convertToMarkdown(phases);
    const response = await fetch('/api/writeFile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: FILE_PATH,
        content: markdown
      })
    });
    
    if (!response.ok) throw new Error('Failed to write progress file');
  } catch (error) {
    console.error('Error writing progress file:', error);
    throw error;
  }
};

export { readProgressFile, writeProgressFile };