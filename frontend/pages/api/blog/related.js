import fs from 'fs';
import path from 'path';

// API route to fetch related blog posts based on tags
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  
  const { tags, slug, limit = 3 } = req.query;
  
  // Ensure tags parameter is provided
  if (!tags) {
    return res.status(400).json({ error: 'Tags parameter is required' });
  }
  
  try {
    // Set data directory
    const dataDir = path.join(process.cwd(), 'data');
    const postsFile = path.join(dataDir, 'blog-posts.json');
    
    // Create sample data for development if file doesn't exist
    if (!fs.existsSync(postsFile)) {
      // Return sample related posts
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
      ].filter(post => post.slug !== slug).slice(0, parseInt(limit));
      
      return res.status(200).json(samplePosts);
    }
    
    // Read posts from file
    const postsData = fs.readFileSync(postsFile, 'utf8');
    const allPosts = JSON.parse(postsData);
    
    // Get all published posts except the current one
    const publishedPosts = allPosts.filter(post => 
      post.status === 'published' && post.slug !== slug
    );
    
    // Convert tags to array if it's a string
    const tagArray = typeof tags === 'string' ? tags.split(',') : tags;
    
    // Calculate a relevance score for each post based on tag matches
    const scoredPosts = publishedPosts.map(post => {
      const postTags = post.tags || [];
      // Count how many matching tags there are
      const matchingTags = postTags.filter(tag => tagArray.includes(tag));
      return {
        ...post,
        relevanceScore: matchingTags.length
      };
    });
    
    // Sort by relevance score (highest first), then by date (newest first)
    scoredPosts.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    
    // Return the top N posts
    const relatedPosts = scoredPosts.slice(0, parseInt(limit));
    
    return res.status(200).json(relatedPosts);
    
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return res.status(500).json({ error: 'Failed to fetch related posts' });
  }
}
