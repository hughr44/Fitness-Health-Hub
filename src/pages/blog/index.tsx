import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getSortedPostsData, PostMetadata } from '@/lib/posts';
import { GetStaticProps } from 'next';

type BlogIndexProps = {
  posts: PostMetadata[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <Layout>
      <SEO 
        title="Fitness & Health Blog" 
        description="Read our latest articles on fitness, nutrition, workout plans, and health tips to help you reach your goals."
      />
      
      {/* Blog Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fitness & Health Blog</h1>
            <p className="text-xl text-blue-100">
              Evidence-based articles to help you reach your fitness goals
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData();
  
  return {
    props: {
      posts,
    },
  };
};
