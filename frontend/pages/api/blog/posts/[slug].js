import fs from 'fs';
import path from 'path';

// API route to fetch a single blog post by slug
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  
  const { slug } = req.query;
  
  try {
    // Set data directory
    const dataDir = path.join(process.cwd(), 'data');
    const postsFile = path.join(dataDir, 'blog-posts.json');
    
    // Create sample data for development if file doesn't exist
    if (!fs.existsSync(postsFile)) {
      // Sample post data matching the slug
      const samplePosts = {
        'understanding-car-value': {
          id: '1',
          title: 'Understanding the Value of Your Old Car',
          slug: 'understanding-car-value',
          excerpt: 'Learn about the factors that determine your car\'s value and how to get the best price.',
          content: '# Understanding the Value of Your Old Car\n\nWhen it comes to selling your old car, understanding its value is crucial...',
          author: 'Jane Smith',
          publishedAt: '2025-02-15T10:30:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-value.jpg',
          tags: ['car valuation', 'selling tips']
        },
        'environmental-impact-car-recycling': {
          id: '2',
          title: 'The Environmental Impact of Car Recycling',
          slug: 'environmental-impact-car-recycling',
          excerpt: 'Discover how proper car recycling helps reduce environmental pollution and conserve resources.',
          content: '# The Environmental Impact of Car Recycling\n\nCar recycling is one of the most environmentally beneficial...',
          author: 'John Doe',
          publishedAt: '2025-02-05T14:45:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-recycling.jpg',
          tags: ['recycling', 'environment']
        },
        'what-happens-at-car-wrecker': {
          id: '3',
          title: 'What Happens to Your Car at a Wrecker',
          slug: 'what-happens-at-car-wrecker',
          excerpt: 'A step-by-step guide to the process your car goes through at a professional car wrecker.',
          content: '# What Happens to Your Car at a Wrecker\n\nMany car owners are curious about what happens to their vehicles...',
          author: 'Alex Johnson',
          publishedAt: '2025-01-20T09:15:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-wrecker-process.jpg',
          tags: ['car wrecking', 'recycling']
        }
      };
      
      if (samplePosts[slug]) {
        return res.status(200).json(samplePosts[slug]);
      } else {
        return res.status(404).json({ error: 'Blog post not found' });
      }
    }
    
    // Read posts from file
    const postsData = fs.readFileSync(postsFile, 'utf8');
    const allPosts = JSON.parse(postsData);
    
    // Find the specific post by slug
    const post = allPosts.find(post => post.slug === slug);
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Only allow access to published posts (unless in admin mode)
    if (post.status !== 'published') {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    return res.status(200).json(post);
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return res.status(500).json({ error: 'Failed to fetch blog post' });
  }
}
