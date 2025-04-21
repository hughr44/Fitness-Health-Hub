import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getRecentPosts, PostMetadata } from '@/lib/posts';

type BodyFatProps = {
  recentPosts: PostMetadata[];
};

export default function BodyFatEstimator({ recentPosts }: BodyFatProps) {
  // Form state
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [waist, setWaist] = useState<number | ''>('');
  const [neck, setNeck] = useState<number | ''>('');
  const [hip, setHip] = useState<number | ''>(''); // Only for females
  const [canSeeAbs, setCanSeeAbs] = useState<boolean>(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Results state
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('');
  
  // Calculate body fat percentage using U.S. Navy method
  const calculateBodyFat = () => {
    if (height === '' || weight === '' || waist === '' || neck === '' || (gender === 'female' && hip === '')) {
      return;
    }
    
    // Convert imperial to metric if needed
    let heightCm = Number(height);
    let waistCm = Number(waist);
    let neckCm = Number(neck);
    let hipCm = hip !== '' ? Number(hip) : 0;
    
    if (unit === 'imperial') {
      heightCm = heightCm * 2.54; // inches to cm
      waistCm = waistCm * 2.54; // inches to cm
      neckCm = neckCm * 2.54; // inches to cm
      hipCm = hipCm * 2.54; // inches to cm
    }
    
    // Calculate body fat percentage using U.S. Navy method
    let bodyFat = 0;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
    
    // Adjust based on visible abs (simple adjustment for visual cues)
    if (canSeeAbs && gender === 'male' && bodyFat > 15) {
      bodyFat = Math.max(bodyFat - 2, 10); // Reduce by 2%, but not below 10%
    } else if (canSeeAbs && gender === 'female' && bodyFat > 22) {
      bodyFat = Math.max(bodyFat - 2, 18); // Reduce by 2%, but not below 18%
    }
    
    // Determine category
    let category = '';
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletic';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 16) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletic';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }
    
    // Update state with results
    setBodyFatPercentage(Math.round(bodyFat * 10) / 10); // Round to 1 decimal place
    setBodyFatCategory(category);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBodyFat();
  };
  
  // Reset form
  const handleReset = () => {
    setGender('male');
    setHeight('');
    setWeight('');
    setWaist('');
    setNeck('');
    setHip('');
    setCanSeeAbs(false);
    setBodyFatPercentage(null);
    setBodyFatCategory('');
  };
  
  return (
    <Layout>
      <SEO 
        title="Body Fat Percentage Estimator" 
        description="Estimate your body fat percentage and understand what it means for your health and fitness goals."
        canonical="https://tempsite.com/tools/bodyfat"
      />
      
      <section className="py-12 bg-green-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Body Fat Percentage Estimator</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Estimate your body fat percentage to track your fitness progress.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Unit System</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-green-600"
                        checked={unit === 'metric'}
                        onChange={() => setUnit('metric')}
                      />
                      <span className="ml-2 text-gray-700">Metric (cm, kg)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-green-600"
                        checked={unit === 'imperial'}
                        onChange={() => setUnit('imperial')}
                      />
                      <span className="ml-2 text-gray-700">Imperial (inches, lbs)</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Gender</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-green-600"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-green-600"
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="height" className="block text-gray-700 font-medium mb-2">
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input
                      type="number"
                      id="height"
                      min="1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input
                      type="number"
                      id="weight"
                      min="1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="waist" className="block text-gray-700 font-medium mb-2">
                      Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input
                      type="number"
                      id="waist"
                      min="1"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Measure at the narrowest point, usually around the navel.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="neck" className="block text-gray-700 font-medium mb-2">
                      Neck Circumference ({unit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input
                      type="number"
                      id="neck"
                      min="1"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Measure just below the larynx (Adam's apple).</p>
                  </div>
                  
                  {gender === 'female' && (
                    <div>
                      <label htmlFor="hip" className="block text-gray-700 font-medium mb-2">
                        Hip Circumference ({unit === 'metric' ? 'cm' : 'inches'})
                      </label>
                      <input
                        type="number"
                        id="hip"
                        min="1"
                        value={hip}
                        onChange={(e) => setHip(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Measure at the widest part of the buttocks.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-600"
                      checked={canSeeAbs}
                      onChange={(e) => setCanSeeAbs(e.target.checked)}
                    />
                    <span className="ml-2 text-gray-700">I can see my abs (visible abdominal definition)</span>
                  </label>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    type="submit"
                    className="btn bg-green-600 text-white hover:bg-green-700 py-3 px-6 md:flex-1"
                  >
                    Calculate Body Fat
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary py-3 px-6 md:flex-1"
                  >
                    Reset
                  </button>
                </div>
              </form>
              
              {/* Results Section */}
              {bodyFatPercentage !== null && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold mb-6">Your Results</h2>
                  
                  <div className="bg-green-50 p-6 rounded-lg text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">Estimated Body Fat Percentage</h3>
                    <p className="text-5xl font-bold text-green-600 mb-2">{bodyFatPercentage}%</p>
                    <p className="text-xl font-medium text-gray-700">Category: {bodyFatCategory}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Body Fat Range</th>
                            <th className="px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gender === 'male' ? (
                            <>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Essential Fat</td>
                                <td className="border px-4 py-2">2-5%</td>
                                <td className="border px-4 py-2">Minimum needed for basic health</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Athletic</td>
                                <td className="border px-4 py-2">6-13%</td>
                                <td className="border px-4 py-2">Defined muscles, visible veins</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Fitness</td>
                                <td className="border px-4 py-2">14-17%</td>
                                <td className="border px-4 py-2">Lean with some definition</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Average</td>
                                <td className="border px-4 py-2">18-24%</td>
                                <td className="border px-4 py-2">Some muscle definition, but some fat</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Obese</td>
                                <td className="border px-4 py-2">25%+</td>
                                <td className="border px-4 py-2">Significant fat accumulation</td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Essential Fat</td>
                                <td className="border px-4 py-2">10-15%</td>
                                <td className="border px-4 py-2">Minimum needed for basic health</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Athletic</td>
                                <td className="border px-4 py-2">16-20%</td>
                                <td className="border px-4 py-2">Defined muscles, athletic appearance</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Fitness</td>
                                <td className="border px-4 py-2">21-24%</td>
                                <td className="border px-4 py-2">Lean with some definition</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Average</td>
                                <td className="border px-4 py-2">25-31%</td>
                                <td className="border px-4 py-2">Less definition, more fat storage</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-medium">Obese</td>
                                <td className="border px-4 py-2">32%+</td>
                                <td className="border px-4 py-2">Significant fat accumulation</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
                    <p className="text-gray-700">
                      This is an estimate based on the U.S. Navy method, which has a standard error of 3-4%. For a more accurate 
                      measurement, consider methods like DEXA scans, BodPod, or hydrostatic weighing. This calculator is not meant 
                      to diagnose any medical conditions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
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
  const recentPosts = getRecentPosts(3);
  
  return {
    props: {
      recentPosts,
    },
  };
};
