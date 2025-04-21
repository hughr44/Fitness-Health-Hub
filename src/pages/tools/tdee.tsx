import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getRecentPosts, PostMetadata } from '@/lib/posts';

type MaintenanceCalorieProps = {
  recentPosts: PostMetadata[];
};

export default function MaintenanceCalorieCalculator({ recentPosts }: MaintenanceCalorieProps) {
  // Form state
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Results state
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);
  const [fatLoss, setFatLoss] = useState<number | null>(null);
  const [muscleGain, setMuscleGain] = useState<number | null>(null);
  
  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9, // Very hard exercise & physical job or 2x training
  };
  
  // Calculate TDEE
  const calculateTDEE = () => {
    if (age === '' || height === '' || weight === '') {
      return;
    }
    
    // Convert imperial to metric if needed
    let weightKg = weight;
    let heightCm = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightCm = height * 2.54; // inches to cm
    }
    
    // Calculate BMR using Mifflin-St Jeor formula
    let bmrValue = 0;
    if (gender === 'male') {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5;
    } else {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161;
    }
    
    // Calculate TDEE based on activity level
    const tdeeValue = bmrValue * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    
    // Calculate calorie targets
    const fatLossValue = tdeeValue * 0.85; // 15% deficit
    const muscleGainValue = tdeeValue * 1.15; // 15% surplus
    
    // Update state with results
    setBMR(Math.round(bmrValue));
    setTDEE(Math.round(tdeeValue));
    setFatLoss(Math.round(fatLossValue));
    setMuscleGain(Math.round(muscleGainValue));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTDEE();
  };
  
  // Reset form
  const handleReset = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setActivityLevel('moderate');
    setBMR(null);
    setTDEE(null);
    setFatLoss(null);
    setMuscleGain(null);
  };
  
  return (
    <Layout>
      <SEO 
        title="Maintenance Calorie Calculator" 
        description="Find out how many calories you burn in a day and determine your maintenance calories to optimize your nutrition for fat loss or muscle gain."
        canonical="https://tempsite.com/tools/tdee"
      />
      
      <section className="py-12 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Maintenance Calorie Calculator</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Find out how many calories you burn in a day and determine your optimal calorie intake for your goals.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Unit System</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        checked={unit === 'metric'}
                        onChange={() => setUnit('metric')}
                      />
                      <span className="ml-2 text-gray-700">Metric (cm, kg)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        checked={unit === 'imperial'}
                        onChange={() => setUnit('imperial')}
                      />
                      <span className="ml-2 text-gray-700">Imperial (inches, lbs)</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
                    <input
                      type="number"
                      id="age"
                      min="15"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>
                  
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="activity" className="block text-gray-700 font-medium mb-2">Activity Level</label>
                  <select
                    id="activity"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="active">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="veryActive">Extremely Active (very hard exercise, physical job or 2x training)</option>
                  </select>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="activity" className="block text-gray-700 font-medium mb-2">Activity Level</label>
                  <select
                    id="activity"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="active">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="veryActive">Extremely Active (very hard exercise, physical job or 2x training)</option>
                  </select>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-6 md:flex-1"
                  >
                    Calculate Maintenance Calories
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
            {tdee !== null && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">BMR</h3>
                    <p className="text-3xl font-bold text-blue-600">{bmr} calories/day</p>
                    <p className="text-sm text-gray-600 mt-2">Base Metabolic Rate</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Daily Calories</h3>
                    <p className="text-3xl font-bold text-green-600">{tdee} calories/day</p>
                    <p className="text-sm text-gray-600 mt-2">Maintenance Calories</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Fat Loss Target</h3>
                    <p className="text-3xl font-bold text-yellow-600">{fatLoss} calories/day</p>
                    <p className="text-sm text-gray-600 mt-2">15% calorie deficit</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Muscle Gain Target</h3>
                    <p className="text-3xl font-bold text-purple-600">{muscleGain} calories/day</p>
                    <p className="text-sm text-gray-600 mt-2">15% calorie surplus</p>
                  </div>
                </div>
                  
                  <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      These calculations provide estimates based on population averages. Individual metabolism can vary. 
                      For best results, track your intake and weight changes over time, and adjust as needed.
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
