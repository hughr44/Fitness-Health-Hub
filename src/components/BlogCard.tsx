import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
  coverImage: string;
  author: string;
  category?: 'fitness' | 'health';
};

const BlogCard = ({ title, description, slug, date, coverImage, author, category = 'fitness' }: BlogCardProps) => {
  // Format the date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="card h-full flex flex-col overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="relative h-56 w-full overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
        <div className={`absolute top-4 left-4 ${category === 'health' ? 'bg-yellow-500' : 'bg-blue-600'} text-white text-xs font-semibold px-2 py-1 rounded-full z-20`}>
          {category === 'health' ? 'Health' : 'Fitness'}
        </div>
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={false}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col bg-white">
        <div className="flex-grow">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-600 font-semibold text-sm">{author.charAt(0)}</span>
            </div>
            <p className="text-sm text-gray-500">{author} • {formattedDate}</p>
          </div>
          <Link href={`/blog/${slug}`} className="block mb-3 group">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
          </Link>
          <p className="text-gray-600 line-clamp-3 mb-4">{description}</p>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <Link 
            href={`/blog/${slug}`} 
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <span>Read Article</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
