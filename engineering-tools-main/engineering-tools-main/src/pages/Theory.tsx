import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Calculator, Zap, ChevronRight, BookOpen, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Theory: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    {
      id: 'anatomy',
      name: t('subject.anatomy'),
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      description: 'Study human body structure and systems',
      topics: ['Cardiovascular System', 'Respiratory System', 'Nervous System', 'Musculoskeletal System'],
      lectures: [
        { title: 'Introduction to Human Anatomy', duration: '45 min', type: 'video' },
        { title: 'Cardiovascular System Overview', duration: '60 min', type: 'interactive' },
        { title: 'Heart Structure and Function', duration: '40 min', type: 'animation' },
        { title: 'Blood Circulation Pathways', duration: '35 min', type: 'simulation' }
      ]
    },
    {
      id: 'physiology',
      name: t('subject.physiology'),
      icon: Brain,
      color: 'from-purple-400 to-blue-500',
      description: 'Understand how body systems function',
      topics: ['Cell Physiology', 'Organ Function', 'Homeostasis', 'Neural Mechanisms'],
      lectures: [
        { title: 'Cell Physiology Fundamentals', duration: '50 min', type: 'video' },
        { title: 'Nervous System Function', duration: '55 min', type: 'interactive' },
        { title: 'Homeostasis Mechanisms', duration: '40 min', type: 'case-study' },
        { title: 'Organ System Integration', duration: '45 min', type: 'simulation' }
      ]
    },
    {
      id: 'math',
      name: t('subject.math'),
      icon: Calculator,
      color: 'from-green-400 to-blue-400',
      description: 'Mathematical foundations for biomedical engineering',
      topics: ['Calculus', 'Linear Algebra', 'Differential Equations', 'Statistics'],
      lectures: [
        { title: 'Calculus in Biomedical Applications', duration: '60 min', type: 'lecture' },
        { title: 'Linear Algebra for Signal Processing', duration: '50 min', type: 'problem-solving' },
        { title: 'Differential Equations in Biology', duration: '65 min', type: 'theory' },
        { title: 'Biostatistics and Data Analysis', duration: '55 min', type: 'practical' }
      ]
    },
    {
      id: 'circuits',
      name: t('subject.circuits'),
      icon: Zap,
      color: 'from-yellow-400 to-red-500',
      description: 'Electronic circuits and biomedical applications',
      topics: ['Basic Circuits', 'Amplifiers', 'Filters', 'Medical Instrumentation'],
      lectures: [
        { title: 'Circuit Analysis Fundamentals', duration: '45 min', type: 'theory' },
        { title: 'Operational Amplifiers in Medical Devices', duration: '50 min', type: 'practical' },
        { title: 'Filter Design for Biomedical Signals', duration: '55 min', type: 'design' },
        { title: 'ECG and EEG Circuit Design', duration: '60 min', type: 'project' }
      ]
    }
  ];

  const SubjectCard: React.FC<{ subject: typeof subjects[0] }> = ({ subject }) => {
    const Icon = subject.icon;
    const isExpanded = selectedSubject === subject.id;
    
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className={`h-32 bg-gradient-to-br ${subject.color} relative`}>
          <div className="absolute inset-0 bg-black bg-opacity-10" />
          <div className="absolute bottom-4 left-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="absolute top-4 right-4">
            <ChevronRight className="h-6 w-6 text-white opacity-80" />
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{subject.name}</h3>
          <p className="text-gray-600 mb-4">{subject.description}</p>
          
          <div className="space-y-2 mb-4">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Key Topics:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {subject.topics.map((topic, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={() => setSelectedSubject(isExpanded ? null : subject.id)}
            className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 mb-4"
          >
            {isExpanded ? 'Hide Lectures' : 'View Lectures'}
          </button>
          
          {isExpanded && (
            <div className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-gray-800">Available Lectures:</h4>
              {subject.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h5 className="font-medium text-gray-900">{lecture.title}</h5>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="mr-4">{lecture.duration}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize text-xs">
                        {lecture.type}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <Link
            to={`/subject/${subject.id}`}
            className="block w-full text-center px-4 py-2 mt-3 border border-pink-500 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition-all duration-200"
          >
            Enter Subject Room
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('nav.theory')}
        </h1>
        <p className="text-xl text-gray-600">
          Explore comprehensive theoretical knowledge organized by subject areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Interactive Learning Experience</h2>
          <p className="text-lg opacity-90 mb-6">
            Each subject room contains interactive content, 3D models, practice problems, 
            and real-world applications to enhance your understanding of biomedical engineering concepts.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Heart className="h-5 w-5 mr-2" />
              <span>3D Models</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>Interactive Content</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Calculator className="h-5 w-5 mr-2" />
              <span>Practice Problems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;