import fs from 'fs';
import path from 'path';

// In a real application, this would interact with a database
// For this demo, we'll simulate by reading/writing to a JSON file

export default async function handler(req, res) {
  // Set data directory
  const dataDir = path.join(process.cwd(), 'data');
  const postsFile = path.join(dataDir, 'blog-posts.json');
  
  // Make sure the data directory exists
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Create an empty file if it doesn't exist
    if (!fs.existsSync(postsFile)) {
      fs.writeFileSync(postsFile, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error setting up data directory:', error);
    return res.status(500).json({ error: 'Server error setting up data storage' });
  }
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        // Read posts from file
        const postsData = fs.readFileSync(postsFile, 'utf8');
        const posts = JSON.parse(postsData);
        
        // Filter by tag if provided
        const { tag } = req.query;
        let filteredPosts = posts;
        
        if (tag) {
          filteredPosts = posts.filter(post => 
            post.tags && post.tags.includes(tag)
          );
        }
        
        return res.status(200).json(filteredPosts);
      } catch (error) {
        console.error('Error reading blog posts:', error);
        return res.status(500).json({ error: 'Failed to retrieve blog posts' });
      }
      
    case 'POST':
      try {
        // Read existing posts
        const postsData = fs.readFileSync(postsFile, 'utf8');
        const posts = JSON.parse(postsData);
        
        // Create new post with ID
        const newPost = {
          id: `${Date.now()}`, // Simple ID generation
          ...req.body,
          createdAt: new Date().toISOString()
        };
        
        // Add to posts array
        posts.push(newPost);
        
        // Write back to file
        fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
        
        return res.status(201).json(newPost);
      } catch (error) {
        console.error('Error creating blog post:', error);
        return res.status(500).json({ error: 'Failed to create blog post' });
      }
      
    default:
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
