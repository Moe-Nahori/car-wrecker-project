import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCompanyName } from '@/utils/config';
import BlogSidebar from '@/components/blog/BlogSidebar';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import BlogPostTags from '@/components/blog/BlogPostTags';
import RelatedPosts from '@/components/blog/RelatedPosts';

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const companyName = getCompanyName();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      // In a real implementation, this would fetch from an API
      const response = await fetch(`/api/blog/posts/${slug}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      
      const data = await response.json();
      setPost(data);
      
      // Fetch related posts
      fetchRelatedPosts(data.tags);
      
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching blog post:', error);
      
      // For development, we'll use sample data
      const samplePosts = {
        'understanding-car-value': {
          id: '1',
          title: 'Understanding the Value of Your Old Car',
          slug: 'understanding-car-value',
          excerpt: 'Learn about the factors that determine your car\'s value and how to get the best price for your old vehicle.',
          content: `# Understanding the Value of Your Old Car

When it comes to selling your old car, understanding its value is crucial to ensure you get a fair price. Many factors influence how much your vehicle is worth, from its age and condition to market demand.

## Key Factors That Determine Your Car's Value

### Age and Kilometers

The age of your vehicle and the number of kilometers it has traveled are primary factors in determining its value. Generally, newer cars with fewer kilometers command higher prices. However, certain classic or collectible models may increase in value with age if properly maintained.

### Make and Model

Some car brands and models hold their value better than others. Japanese and German vehicles, for example, are often known for retaining value due to their reliability and build quality.

### Condition

The overall condition of your car significantly impacts its value:

- **Excellent**: Looks new, runs perfectly with complete service history
- **Good**: Minor wear and tear but mechanically sound
- **Fair**: Some mechanical issues and visible wear
- **Poor**: Significant mechanical problems or body damage
- **Not Running**: Vehicles that are not operational

### Market Demand

Market trends can dramatically affect your car's value. For example, when fuel prices rise, fuel-efficient vehicles often see increased demand. Seasonal factors can also play a role, with convertibles potentially fetching higher prices in spring and summer.

### Optional Features

Additional features like leather seats, sunroofs, advanced safety systems, and infotainment packages can increase your car's value.

## How Professional Car Wreckers Determine Value

Professional car wreckers consider additional factors when valuing your vehicle:

1. **Salvageable Parts**: Even if your car isn't running, it may contain valuable components that can be resold.

2. **Metal Value**: The vehicle's weight in recyclable metals has a base value.

3. **Environmental Fees**: Costs associated with properly disposing of hazardous materials like oil and coolant are factored into the offer.

4. **Market Demand for Parts**: Some vehicle models have parts that are in high demand, increasing the value of the vehicle to a wrecker.

## Getting an Accurate Valuation

To ensure you receive a fair value assessment:

1. Gather all maintenance records and documentation
2. Be honest about the vehicle's condition
3. Get multiple quotes from different buyers
4. Understand your local market conditions
5. Consider the time of year when selling

Remember that the most reliable way to determine your car's current value is to get a professional assessment from a reputable car wrecker or valuation expert.`,
          author: 'Jane Smith',
          publishedAt: '2025-02-15T10:30:00Z',
          featuredImage: '/images/blog/car-value.jpg',
          tags: ['car valuation', 'selling tips']
        },
        'environmental-impact-car-recycling': {
          id: '2',
          title: 'The Environmental Impact of Car Recycling',
          slug: 'environmental-impact-car-recycling',
          excerpt: 'Discover how proper car recycling helps reduce environmental pollution and conserve valuable resources.',
          content: `# The Environmental Impact of Car Recycling

Car recycling is one of the most environmentally beneficial recycling processes in Australia. Each year, millions of vehicles reach the end of their useful life and without proper recycling would create significant environmental issues.

## The Environmental Benefits of Car Recycling

### Reduction in Landfill Waste

When cars are properly recycled, up to 80% of the vehicle can be recovered and reused. This significantly reduces the amount of waste sent to landfills.

### Conservation of Resources

Recycling cars helps conserve valuable natural resources:

- **Metals**: Recycling steel uses 75% less energy than creating new steel from raw materials
- **Oil**: Properly draining and recycling automotive fluids prevents groundwater contamination
- **Plastics**: Many plastic components can be recycled into new products

### Energy Savings

The energy saved by recycling one ton of steel is enough to power the average home for over three weeks. A typical car contains about a ton of steel and iron.

### Reduction in Harmful Emissions

Manufacturing products from recycled materials produces significantly less air and water pollution than manufacturing from raw materials.

## The Car Recycling Process

1. **Depollution**: All hazardous fluids and materials (oils, coolant, fuel, batteries) are safely removed
2. **Parts Harvesting**: Usable parts are removed for resale
3. **Material Separation**: Remaining materials are sorted (metals, plastics, glass)
4. **Crushing and Shredding**: The shell is crushed and shredded
5. **Recycling**: Materials are sent to specialized recycling facilities

## Environmental Certification

Look for car wreckers with proper environmental certification. In Australia, this includes:

- Environmental Protection Authority (EPA) licensing
- ISO 14001 certification for environmental management systems
- Green Stamp accreditation

## The Future of Car Recycling

With advancements in recycling technology, the percentage of vehicles that can be recycled continues to increase. Additionally, as electric vehicles become more common, specialized recycling processes for batteries and electric components are being developed.

By choosing a certified car recycling service, you're making a significant contribution to environmental conservation and sustainability.`,
          author: 'John Doe',
          publishedAt: '2025-02-05T14:45:00Z',
          featuredImage: '/images/blog/car-recycling.jpg',
          tags: ['recycling', 'environment']
        },
        'what-happens-at-car-wrecker': {
          id: '3',
          title: 'What Happens to Your Car at a Wrecker',
          slug: 'what-happens-at-car-wrecker',
          excerpt: 'A step-by-step guide to the process your car goes through at a professional car wrecker facility.',
          content: `# What Happens to Your Car at a Wrecker

Many car owners are curious about what happens to their vehicles after they sell them to a car wrecker. The process is fascinating and highly optimized to maximize resource recovery while minimizing environmental impact.

## The Complete Car Wrecking Process

### 1. Initial Assessment and Valuation

When your car arrives at a wrecking yard, it undergoes a thorough assessment:

- Vehicle identification (make, model, year)
- Documentation verification
- Parts inventory assessment
- Overall condition evaluation

Based on this assessment, the car's value is determined by considering:
- The salvageable parts
- Metal weight and value
- Current market demand
- Cost of processing

### 2. Depollution and Hazardous Materials Removal

Before dismantling begins, all hazardous materials are safely removed:

- Draining all fluids (oil, coolant, brake fluid, power steering fluid)
- Removing batteries
- Removing mercury switches
- Disposing of air conditioning gases
- Removing fuel

These materials are either recycled or disposed of according to strict environmental regulations.

### 3. Parts Removal and Inventory

Skilled technicians remove valuable components that can be resold:

- Engines and transmissions
- Electronics and control modules
- Interior components
- Body panels and glass
- Wheels and tires
- Catalytic converters

Each part is inspected, cleaned, tested, and entered into inventory with a warranty.

### 4. Vehicle Crushing and Metal Recycling

Once all usable parts are removed:

- The vehicle shell is crushed to reduce volume
- The crushed vehicle is sent to a metal recycler
- At the recycling facility, the crushed car is shredded
- A series of magnets and sensors separate different metals
- The separated materials are processed for recycling

### 5. Final Processing of Materials

The separated materials follow different paths:

- Ferrous metals (steel, iron): Melted down for new products
- Non-ferrous metals (aluminum, copper): Sent to specialized recyclers
- Plastics: Processed for recycling where possible
- Glass: Crushed and recycled into new products or construction materials
- Remaining materials: Processed through advanced separation techniques

## Environmental Compliance

Throughout this entire process, professional car wreckers follow strict environmental guidelines to ensure minimum impact. This includes:

- Proper containment of all fluids
- Licensed disposal of hazardous materials
- Dust and noise control
- Stormwater management
- Regular environmental audits

By understanding this process, car owners can appreciate the important role wreckers play in the automotive lifecycle and environmental conservation.`,
          author: 'Alex Johnson',
          publishedAt: '2025-01-20T09:15:00Z',
          featuredImage: '/images/blog/car-wrecker-process.jpg',
          tags: ['car wrecking', 'recycling']
        }
      };
      
      // Find the requested post in our sample data
      if (samplePosts[slug]) {
        setPost(samplePosts[slug]);
        
        // Set related posts (any other posts)
        const related = Object.values(samplePosts)
          .filter(p => p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
        
        setLoading(false);
      } else {
        setError('Blog post not found');
        setLoading(false);
      }
    }
  };

  const fetchRelatedPosts = async (tags) => {
    try {
      // In a real implementation, this would fetch from an API
      const response = await fetch(`/api/blog/related?tags=${tags.join(',')}&slug=${slug}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch related posts');
      }
      
      const data = await response.json();
      setRelatedPosts(data);
      
    } catch (error) {
      console.error('Error fetching related posts:', error);
      // We already handled this in the sample data above
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <ChevronLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | {companyName} Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph / Social Media Meta Tags would go here */}
      </Head>
      
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
                Blog
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
                {post.title}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Main content - blog post */}
            <div className="lg:col-span-5">
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {post.author}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                  </h1>
                  
                  {/* Tags */}
                  <BlogPostTags tags={post.tags} />
                  
                  {/* Content */}
                  <div className="mt-8 prose dark:prose-invert max-w-none">
                    <MarkdownRenderer content={post.content} />
                  </div>
                </div>
              </article>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} />
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <BlogSidebar tags={post.tags} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
