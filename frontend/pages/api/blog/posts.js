import fs from 'fs';
import path from 'path';

// API route to fetch public blog posts
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  
  try {
    // Set data directory
    const dataDir = path.join(process.cwd(), 'data');
    const postsFile = path.join(dataDir, 'blog-posts.json');
    
    // Create default response for development if file doesn't exist
    if (!fs.existsSync(postsFile)) {
      // Return sample data for development
      const samplePosts = [
        {
          id: '1',
          title: 'Understanding the Value of Your Old Car',
          slug: 'understanding-car-value',
          excerpt: 'Learn about the factors that determine your car\'s value and how to get the best price.',
          author: 'Jane Smith',
          publishedAt: '2025-02-15T10:30:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-value.jpg',
          tags: ['car valuation', 'selling tips']
        },
        {
          id: '2',
          title: 'The Environmental Impact of Car Recycling',
          slug: 'environmental-impact-car-recycling',
          excerpt: 'Discover how proper car recycling helps reduce environmental pollution and conserve resources.',
          author: 'John Doe',
          publishedAt: '2025-02-05T14:45:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-recycling.jpg',
          tags: ['recycling', 'environment']
        },
        {
          id: '3',
          title: 'What Happens to Your Car at a Wrecker',
          slug: 'what-happens-at-car-wrecker',
          excerpt: 'A step-by-step guide to the process your car goes through at a professional car wrecker.',
          author: 'Alex Johnson',
          publishedAt: '2025-01-20T09:15:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-wrecker-process.jpg',
          tags: ['car wrecking', 'recycling']
        }
      ];
      
      return res.status(200).json(samplePosts);
    }
    
    // Read posts from file
    const postsData = fs.readFileSync(postsFile, 'utf8');
    const allPosts = JSON.parse(postsData);
    
    // Only return published posts for public consumption
    const publishedPosts = allPosts.filter(post => post.status === 'published');
    
    // Filter by tag if provided
    const { tag } = req.query;
    
    if (tag) {
      const filteredPosts = publishedPosts.filter(post => 
        post.tags && post.tags.includes(tag)
      );
      return res.status(200).json(filteredPosts);
    }
    
    // Sort by publishedAt date (newest first)
    publishedPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    return res.status(200).json(publishedPosts);
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}
