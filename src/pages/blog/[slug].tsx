import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import CTAButton from '@/components/CTAButton';
import { getAllPostSlugs, getPostData, getRecentPosts, PostMetadata } from '@/lib/posts';

type BlogPostProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<PostMetadata, 'content' | 'slug'>;
  slug: string;
  relatedPosts: PostMetadata[];
};

export default function BlogPost({ source, frontMatter, slug, relatedPosts }: BlogPostProps) {
  const { title, description, date, coverImage, author } = frontMatter;
  
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <SEO 
        title={title}
        description={description}
        canonical={`https://tempsite.com/blog/${slug}`}
        ogImage={coverImage}
      />
      
      <article className="py-8">
        <div className="container-custom">
          {/* Blog Header */}
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="flex items-center text-gray-500 mb-8">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{author}</span>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="max-w-xl mx-auto mb-12">
            <Image
              src={coverImage}
              alt={title}
              width={300}
              height={200}
              className="rounded-lg mx-auto"
              priority
            />
          </div>
          
          {/* Blog Content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-blue">
            <MDXRemote 
              {...source} 
              components={{
                a: ({ href, children }) => {
                  // Check if this is an Amazon link (likely a CTA)
                  if (href && href.includes('amazon.com')) {
                    return (
                      <div className="my-6 text-center">
                        <CTAButton href={href} variant="primary" size="large">
                          {children}
                        </CTAButton>
                      </div>
                    );
                  }
                  // Regular link
                  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
                blockquote: (props) => (
                  <blockquote className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-md" {...props} />
                ),
                // Add more custom components as needed
              }}
            />
          </div>
          
          {/* Author and Date */}
          <div className="max-w-3xl mx-auto mt-12 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">{author}</p>
              <p className="text-gray-500 text-sm">{formattedDate}</p>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Posts */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                slug={post.slug}
                date={post.date}
                coverImage={post.coverImage}
                author={post.author}
                category={post.category || 'fitness'}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const postData = getPostData(slug);
  const mdxSource = await serialize(postData.content || '');
  
  // Get related posts (excluding the current post)
  const relatedPosts = getRecentPosts(4).filter(post => post.slug !== slug).slice(0, 3);
  
  return {
    props: {
      source: mdxSource,
      frontMatter: {
        title: postData.title,
        description: postData.description,
        date: postData.date,
        coverImage: postData.coverImage,
        author: postData.author,
      },
      slug,
      relatedPosts,
    },
  };
};
