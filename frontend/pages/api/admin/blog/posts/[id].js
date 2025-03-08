import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  
  // Set data directory and file
  const dataDir = path.join(process.cwd(), 'data');
  const postsFile = path.join(dataDir, 'blog-posts.json');
  
  // Check if posts file exists
  if (!fs.existsSync(postsFile)) {
    return res.status(404).json({ error: 'Blog posts not found' });
  }
  
  // Read posts from file
  try {
    const postsData = fs.readFileSync(postsFile, 'utf8');
    const posts = JSON.parse(postsData);
    
    // Find the specific post
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return res.status(200).json(posts[postIndex]);
        
      case 'PUT':
        // Update the post
        const updatedPost = {
          ...posts[postIndex],
          ...req.body,
          id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString()
        };
        
        posts[postIndex] = updatedPost;
        
        // Write back to file
        fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
        
        return res.status(200).json(updatedPost);
        
      case 'DELETE':
        // Remove the post
        const filteredPosts = posts.filter(post => post.id !== id);
        
        // Write back to file
        fs.writeFileSync(postsFile, JSON.stringify(filteredPosts, null, 2));
        
        return res.status(200).json({ success: true, message: 'Post deleted successfully' });
        
      default:
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error processing blog post request:', error);
    return res.status(500).json({ error: 'Failed to process blog post request' });
  }
}
