import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Brain, Calculator, Zap, Play, Book, FileText, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ModelViewer from '../components/ModelViewer';

const SubjectRoom: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const subjectData: Record<string, any> = {
    anatomy: {
      name: t('subject.anatomy'),
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      model: 'heart' as const,
      overview: 'Study the structure and organization of the human body, from cellular level to organ systems.',
      lessons: [
        { title: 'Cardiovascular System', duration: '45 min', type: 'video' },
        { title: 'Heart Structure & Function', duration: '30 min', type: 'interactive' },
        { title: 'Blood Circulation', duration: '25 min', type: 'simulation' },
        { title: 'Cardiac Cycle', duration: '35 min', type: 'animation' }
      ],
      resources: [
        { title: 'Anatomy Atlas', type: 'PDF', size: '15 MB' },
        { title: 'Heart Dissection Guide', type: 'Video', duration: '20 min' },
        { title: 'Practice Quiz: Cardiac Anatomy', type: 'Interactive', questions: 25 }
      ]
    },
    physiology: {
      name: t('subject.physiology'),
      icon: Brain,
      color: 'from-purple-400 to-blue-500',
      model: 'brain' as const,
      overview: 'Understand how body systems work together to maintain life and health.',
      lessons: [
        { title: 'Nervous System Function', duration: '50 min', type: 'video' },
        { title: 'Synaptic Transmission', duration: '40 min', type: 'interactive' },
        { title: 'Neural Pathways', duration: '30 min', type: 'simulation' },
        { title: 'Brain Waves & EEG', duration: '35 min', type: 'data' }
      ],
      resources: [
        { title: 'Physiology Textbook', type: 'PDF', size: '25 MB' },
        { title: 'EEG Signal Analysis', type: 'Software', platform: 'MATLAB' },
        { title: 'Neural Network Simulation', type: 'Interactive', complexity: 'Advanced' }
      ]
    },
    math: {
      name: t('subject.math'),
      icon: Calculator,
      color: 'from-green-400 to-blue-400',
      model: 'dna' as const,
      overview: 'Master the mathematical foundations essential for biomedical engineering analysis.',
      lessons: [
        { title: 'Differential Equations in Biology', duration: '60 min', type: 'lecture' },
        { title: 'Linear Algebra Applications', duration: '45 min', type: 'problem-solving' },
        { title: 'Statistics in Medical Research', duration: '40 min', type: 'case-study' },
        { title: 'Signal Processing Math', duration: '55 min', type: 'practical' }
      ],
      resources: [
        { title: 'Mathematical Methods', type: 'PDF', size: '30 MB' },
        { title: 'MATLAB Tutorials', type: 'Video Series', episodes: 12 },
        { title: 'Practice Problems', type: 'Interactive', difficulty: 'Mixed' }
      ]
    },
    circuits: {
      name: t('subject.circuits'),
      icon: Zap,
      color: 'from-yellow-400 to-red-500',
      model: 'heart' as const,
      overview: 'Learn electronic circuit principles and their applications in medical devices.',
      lessons: [
        { title: 'Basic Circuit Analysis', duration: '40 min', type: 'theory' },
        { title: 'Operational Amplifiers', duration: '50 min', type: 'practical' },
        { title: 'Medical Instrumentation', duration: '45 min', type: 'application' },
        { title: 'ECG Circuit Design', duration: '60 min', type: 'project' }
      ],
      resources: [
        { title: 'Circuit Design Handbook', type: 'PDF', size: '20 MB' },
        { title: 'SPICE Simulation Files', type: 'Software', format: 'Various' },
        { title: 'Component Database', type: 'Reference', entries: '500+' }
      ]
    }
  };

  const currentSubject = subject ? subjectData[subject] : null;

  if (!currentSubject) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Subject not found</h1>
      </div>
    );
  }

  const Icon = currentSubject.icon;
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'lessons', label: 'Lessons', icon: Play },
    { id: 'resources', label: 'Resources', icon: FileText }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Subject Header */}
      <div className={`bg-gradient-to-r ${currentSubject.color} rounded-2xl p-8 mb-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-4">
              <Icon className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">{currentSubject.name}</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">{currentSubject.overview}</p>
          </div>
          <div className="hidden md:block w-48 h-48">
            <ModelViewer
              alt={currentSubject.model}
              className="w-full h-full"
              autoRotate={true}
              cameraControls={true}
              modelType={currentSubject.model}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-pink-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TabIcon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg">
        {activeTab === 'overview' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">{currentSubject.overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Learning Objectives</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Master fundamental concepts and principles</li>
                    <li>• Apply knowledge to real-world scenarios</li>
                    <li>• Develop problem-solving skills</li>
                    <li>• Understand practical applications</li>
                  </ul>
                </div>
                
                <div className="bg-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-pink-900 mb-4">Course Features</h3>
                  <ul className="space-y-2 text-pink-800">
                    <li>• Interactive 3D models</li>
                    <li>• Video lectures and animations</li>
                    <li>• Hands-on simulations</li>
                    <li>• Practice assessments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
            <div className="space-y-4">
              {currentSubject.lessons.map((lesson: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="mr-4">{lesson.duration}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">
                          {lesson.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSubject.resources.map((resource: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-600' :
                      resource.type === 'Video' ? 'bg-blue-100 text-blue-600' :
                      resource.type === 'Interactive' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {resource.type === 'PDF' && <FileText className="h-6 w-6" />}
                      {resource.type === 'Video' && <Video className="h-6 w-6" />}
                      {resource.type === 'Interactive' && <Play className="h-6 w-6" />}
                      {!['PDF', 'Video', 'Interactive'].includes(resource.type) && <Book className="h-6 w-6" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Type:</strong> {resource.type}</p>
                    {resource.size && <p><strong>Size:</strong> {resource.size}</p>}
                    {resource.duration && <p><strong>Duration:</strong> {resource.duration}</p>}
                    {resource.questions && <p><strong>Questions:</strong> {resource.questions}</p>}
                    {resource.platform && <p><strong>Platform:</strong> {resource.platform}</p>}
                    {resource.episodes && <p><strong>Episodes:</strong> {resource.episodes}</p>}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    {t('common.view')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectRoom;