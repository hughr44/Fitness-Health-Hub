import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getRecentPosts, PostMetadata } from '@/lib/posts';

type WorkoutSplitProps = {
  recentPosts: PostMetadata[];
};

export default function WorkoutSplitGenerator({ recentPosts }: WorkoutSplitProps) {
  // State for form inputs
  const [experienceLevel, setExperienceLevel] = useState<string>('beginner');
  const [goal, setGoal] = useState<string>('fatLoss');
  const [target, setTarget] = useState<string>('overall');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  return (
    <Layout>
      <SEO 
        title="Workout Split Generator" 
        description="Create a personalized workout schedule based on your experience, goals, and available time."
        canonical="https://tempsite.com/tools/workout-split"
      />
      
      <section className="py-12 bg-purple-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Workout Split Generator</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Create a personalized workout schedule based on your experience, goals, and available time.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={experienceLevel === 'beginner'}
                        onChange={() => setExperienceLevel('beginner')}
                      />
                      <span className="ml-2 text-gray-700">Beginner</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={experienceLevel === 'intermediate'}
                        onChange={() => setExperienceLevel('intermediate')}
                      />
                      <span className="ml-2 text-gray-700">Intermediate</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Goal</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={goal === 'fatLoss'}
                        onChange={() => setGoal('fatLoss')}
                      />
                      <span className="ml-2 text-gray-700">Fat Loss</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={goal === 'muscleGain'}
                        onChange={() => setGoal('muscleGain')}
                      />
                      <span className="ml-2 text-gray-700">Muscle Gain</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={goal === 'generalHealth'}
                        onChange={() => setGoal('generalHealth')}
                      />
                      <span className="ml-2 text-gray-700">General Health</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Target</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={target === 'overall'}
                        onChange={() => setTarget('overall')}
                      />
                      <span className="ml-2 text-gray-700">Overall</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={target === 'upperBody'}
                        onChange={() => setTarget('upperBody')}
                      />
                      <span className="ml-2 text-gray-700">Upper Body</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-purple-600"
                        checked={target === 'lowerBody'}
                        onChange={() => setTarget('lowerBody')}
                      />
                      <span className="ml-2 text-gray-700">Lower Body</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Days Per Week</label>
                  <select
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={2}>2 days</option>
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                    <option value={5}>5 days</option>
                    <option value={6}>6 days</option>
                  </select>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="btn bg-purple-600 text-white hover:bg-purple-700 py-3 px-6 w-full"
                  >
                    Generate Workout Split
                  </button>
                </div>
              </form>
              
              {/* Results Section */}
              {showResults && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold mb-2">
                    {experienceLevel === 'beginner' ? 'Beginner' : 'Intermediate'} {
                      goal === 'fatLoss' ? 'Fat Loss' : 
                      goal === 'muscleGain' ? 'Muscle Gain' : 'General Health'
                    } {target === 'overall' ? 'Overall' : target === 'upperBody' ? 'Upper Body' : 'Lower Body'} {daysPerWeek}-Day Split
                  </h2>
                  <p className="text-gray-600 mb-6">
                    A {daysPerWeek}-day workout split designed for {
                      experienceLevel === 'beginner' ? 'beginners' : 'intermediate trainees'
                    } focusing on {
                      goal === 'fatLoss' ? 'fat loss' : 
                      goal === 'muscleGain' ? 'muscle gain' : 'general health'
                    } with emphasis on {
                      target === 'overall' ? 'overall body development' : 
                      target === 'upperBody' ? 'upper body strength and aesthetics' : 'lower body strength and power'
                    }.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
                  <div className="bg-purple-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-sm">
                      {/* Generate workout split based on all parameters */}
                      {(() => {
                        // 2-day workout options
                        if (daysPerWeek === 2) {
                          // Upper Body Focus - 2 days
                          if (target === 'upperBody') {
                            return (
                              <>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Focus{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                              </>
                            );
                          }
                          
                          // Lower Body Focus - 2 days
                          if (target === 'lowerBody') {
                            return (
                              <>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body Focus{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                  <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                  <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                                </div>
                              </>
                            );
                          }
                          
                          // Overall Focus - 2 days (default for 2 days)
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Body A{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Body B{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Upper Body Focus - 3 days
                        if (target === 'upperBody' && daysPerWeek === 3) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Push (Chest/Shoulders/Triceps){goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Pull (Back/Biceps){goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Lower Body Focus - 3 days
                        if (target === 'lowerBody' && daysPerWeek === 3) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Quads Focus{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Push/Pull{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Hamstrings/Glutes + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Upper Body Focus - 4 days
                        if (target === 'upperBody' && daysPerWeek === 4) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Chest/Triceps{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Back/Biceps{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Shoulders/Arms{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Lower Body Focus - 4 days
                        if (target === 'lowerBody' && daysPerWeek === 4) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Quads/Calves{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Push{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Hamstrings/Glutes{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Pull + Core{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Upper Body Focus - 5+ days
                        if (target === 'upperBody' && daysPerWeek >= 5) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Chest{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Back{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Shoulders{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">{daysPerWeek >= 5 ? 'Arms' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">{daysPerWeek >= 6 ? 'Lower Body (Weak Points)' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Lower Body Focus - 5+ days
                        if (target === 'lowerBody' && daysPerWeek >= 5) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Quads{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Push{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Hamstrings/Glutes{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body Pull{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Lower Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">{daysPerWeek >= 6 ? 'Upper Body (Weak Points)' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Overall Focus - 3 days (default)
                        if ((target === 'overall' && daysPerWeek === 3) || daysPerWeek === 3) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Body A{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Body B{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Full Body C{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Overall Focus - 4 days
                        if ((target === 'overall' && daysPerWeek === 4) || daysPerWeek === 4) {
                          return (
                            <>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Monday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Tuesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Wednesday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Thursday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Upper Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Friday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Lower Body{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Saturday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                              <div className="bg-white p-3 rounded-md shadow-sm h-full overflow-hidden">
                                <p className="font-semibold text-purple-600 text-sm">Sunday</p>
                                <p className="text-gray-700 text-xs break-words hyphens-auto">Rest</p>
                              </div>
                            </>
                          );
                        }
                        
                        // Overall Focus - 5+ days or default
                        return (
                          <>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Monday</p>
                              <p className="text-gray-700">Push{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Tuesday</p>
                              <p className="text-gray-700">Pull{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Wednesday</p>
                              <p className="text-gray-700">Legs{goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : ''}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Thursday</p>
                              <p className="text-gray-700">{daysPerWeek >= 4 ? 'Push' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Friday</p>
                              <p className="text-gray-700">{daysPerWeek >= 5 ? 'Pull' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Saturday</p>
                              <p className="text-gray-700">{daysPerWeek >= 6 ? 'Legs' + (goal === 'fatLoss' ? ' + Cardio (20-30 min)' : goal === 'generalHealth' ? ' + Light Cardio (10-15 min)' : '') : 'Rest'}</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <p className="font-semibold text-purple-600">Sunday</p>
                              <p className="text-gray-700">Rest</p>
                            </div>
                          </>
                        );
                      })()
                      }
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Sample Exercises</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {daysPerWeek === 3 ? (
                      <>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Full Body A</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Squats: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Bench Press: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Bent-Over Rows: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Overhead Press: 3 sets x 8-12 reps</li>
                            <li className="text-gray-700">Bicep Curls: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Plank: 3 sets x 30-60 seconds</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Full Body B</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Deadlifts: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Incline Press: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Pull-ups/Lat Pulldowns: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Lateral Raises: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Tricep Extensions: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Russian Twists: 3 sets x 10-15 reps per side</li>
                          </ul>
                        </div>
                      </>
                    ) : daysPerWeek === 4 ? (
                      <>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Upper Body</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Bench Press: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Bent-Over Rows: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Overhead Press: 3 sets x 8-12 reps</li>
                            <li className="text-gray-700">Pull-ups/Lat Pulldowns: 3 sets x 8-12 reps</li>
                            <li className="text-gray-700">Tricep Extensions: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Bicep Curls: 3 sets x 10-15 reps</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Lower Body</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Squats: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Romanian Deadlifts: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Leg Press: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Leg Curls: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Calf Raises: 3 sets x 12-20 reps</li>
                            <li className="text-gray-700">Planks: 3 sets x 30-60 seconds</li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Push</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Bench Press: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Overhead Press: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Incline Dumbbell Press: 3 sets x 8-12 reps</li>
                            <li className="text-gray-700">Lateral Raises: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Tricep Pushdowns: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Overhead Tricep Extensions: 3 sets x 10-15 reps</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-3 text-purple-600">Pull</h4>
                          <ul className="space-y-2">
                            <li className="text-gray-700">Deadlifts: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Pull-ups/Lat Pulldowns: 3-4 sets x 8-12 reps</li>
                            <li className="text-gray-700">Bent-Over Rows: 3 sets x 8-12 reps</li>
                            <li className="text-gray-700">Face Pulls: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Bicep Curls: 3 sets x 10-15 reps</li>
                            <li className="text-gray-700">Hammer Curls: 3 sets x 10-15 reps</li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      This workout split is a general recommendation. Always adjust weights, reps, and exercises based on your 
                      fitness level and any physical limitations. Consider consulting with a fitness professional before starting 
                      a new workout program.
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
