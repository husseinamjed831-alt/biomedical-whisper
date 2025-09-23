import React, { useState } from 'react';
import { ExternalLink, Play, FileText, Video, Download, Star, Clock, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
  url: string;
  type: 'video' | 'text' | 'interactive';
  free: boolean;
}

const Courses: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Biomedical Engineering Fundamentals',
      provider: 'MIT OpenCourseWare',
      description: 'Complete introduction to biomedical engineering principles, covering anatomy, physiology, and engineering applications.',
      duration: '10 weeks',
      level: 'Beginner',
      rating: 4.8,
      students: 25420,
      category: 'General',
      thumbnail: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://ocw.mit.edu/courses/20-309-instrumentation-and-measurement-for-biological-systems-fall-2005/',
      type: 'video',
      free: true
    },
    {
      id: '2',
      title: 'Medical Device Design and Innovation',
      provider: 'Johns Hopkins University (Coursera)',
      description: 'Complete course on medical device design from concept to FDA approval, including regulatory requirements.',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 18935,
      category: 'Design',
      thumbnail: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.coursera.org/learn/biomedical-device-design',
      type: 'interactive',
      free: true
    },
    {
      id: '3',
      title: 'Biomaterials and Tissue Engineering',
      provider: 'Stanford University (edX)',
      description: 'Advanced study of biomaterials, tissue engineering, and regenerative medicine applications.',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 12724,
      category: 'Materials',
      thumbnail: 'https://images.pexels.com/photos/3938077/pexels-photo-3938077.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.edx.org/course/biomaterials',
      type: 'video',
      free: true
    },
    {
      id: '4',
      title: 'Biomedical Signal Processing with MATLAB',
      provider: 'Georgia Tech (edX)',
      description: 'Comprehensive course on processing ECG, EEG, EMG signals using MATLAB and Python.',
      duration: '7 weeks',
      level: 'Intermediate',
      rating: 4.6,
      students: 14832,
      category: 'Signal Processing',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.edx.org/course/biomedical-signal-and-image-processing',
      type: 'interactive',
      free: true
    },
    {
      id: '5',
      title: 'Human Anatomy & Physiology Complete',
      provider: 'Khan Academy',
      description: 'Complete interactive study of human body systems with 3D animations and detailed explanations.',
      duration: '12 weeks',
      level: 'Beginner',
      rating: 4.5,
      students: 45680,
      category: 'Biology',
      thumbnail: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.khanacademy.org/science/ap-biology',
      type: 'video',
      free: true
    },
    {
      id: '6',
      title: 'Advanced Tissue Engineering',
      provider: 'Harvard Medical School (edX)',
      description: 'Advanced course on tissue engineering, organ-on-chip technology, and regenerative medicine.',
      duration: '9 weeks',
      level: 'Advanced',
      rating: 4.8,
      students: 8245,
      category: 'Tissue Engineering',
      thumbnail: 'https://images.pexels.com/photos/3938077/pexels-photo-3938077.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.edx.org/course/introduction-to-tissue-engineering',
      type: 'video',
      free: true
    },
    {
      id: '7',
      title: 'Arduino for Biomedical Applications',
      provider: 'University of California (Coursera)',
      description: 'Learn to build biomedical devices using Arduino microcontrollers and sensors.',
      duration: '5 weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 22150,
      category: 'Electronics',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.coursera.org/learn/arduino',
      type: 'interactive',
      free: true
    },
    {
      id: '8',
      title: 'Medical Imaging and Analysis',
      provider: 'University of Edinburgh (Coursera)',
      description: 'Comprehensive course on medical imaging techniques including MRI, CT, and ultrasound.',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.6,
      students: 16780,
      category: 'Imaging',
      thumbnail: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.coursera.org/learn/medical-imaging',
      type: 'video',
      free: true
    },
    {
      id: '9',
      title: '3D Printing in Medicine',
      provider: 'Technical University of Denmark (edX)',
      description: 'Learn 3D printing applications in medicine including prosthetics and surgical planning.',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 11340,
      category: 'Manufacturing',
      thumbnail: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.edx.org/course/3d-printing-applications',
      type: 'interactive',
      free: true
    },
    {
      id: '10',
      title: 'Biostatistics and Data Analysis',
      provider: 'Johns Hopkins University (Coursera)',
      description: 'Statistical methods for biomedical research including R programming and data visualization.',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.5,
      students: 28960,
      category: 'Statistics',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.coursera.org/learn/biostatistics',
      type: 'interactive',
      free: true
    },
    {
      id: '11',
      title: 'Artificial Intelligence in Healthcare',
      provider: 'Stanford University (Coursera)',
      description: 'AI and machine learning applications in healthcare and medical diagnosis.',
      duration: '7 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 19450,
      category: 'AI/ML',
      thumbnail: 'https://images.pexels.com/photos/3938077/pexels-photo-3938077.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.coursera.org/learn/ai-for-healthcare',
      type: 'interactive',
      free: true
    },
    {
      id: '12',
      title: 'Clinical Trials and Regulatory Affairs',
      provider: 'University of California San Diego (edX)',
      description: 'Understanding clinical trials, FDA regulations, and medical device approval processes.',
      duration: '6 weeks',
      level: 'Advanced',
      rating: 4.4,
      students: 7890,
      category: 'Regulatory',
      thumbnail: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.edx.org/course/clinical-trials',
      type: 'video',
      free: true
    }
  ];

  const categories = ['All', 'General', 'Design', 'Materials', 'Signal Processing', 'Biology', 'Tissue Engineering', 'Electronics', 'Imaging', 'Manufacturing', 'Statistics', 'AI/ML', 'Regulatory'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'interactive':
        return <Play className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Courses & Resources
        </h1>
        <p className="text-xl text-gray-600">
          Curated collection of high-quality educational resources for biomedical engineering
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Level</label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                {course.free && (
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                    FREE
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-blue-600 font-medium">{course.provider}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {getTypeIcon(course.type)}
                    <span className="ml-1 capitalize">{course.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()}
                </div>
              </div>
              
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 group"
              >
                <span>Access Course</span>
                <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No courses found matching your criteria</p>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Resource Categories */}
      <div className="mt-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Additional Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Video className="h-12 w-12 mx-auto mb-4 text-pink-200" />
            <h3 className="text-xl font-semibold mb-2">Video Lectures</h3>
            <p className="text-pink-100">High-quality recorded lectures from top universities</p>
          </div>
          
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Research Papers</h3>
            <p className="text-blue-100">Latest research and academic papers in biomedical engineering</p>
          </div>
          
          <div className="text-center">
            <Download className="h-12 w-12 mx-auto mb-4 text-purple-200" />
            <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
            <p className="text-purple-100">Textbooks, guides, and reference materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;