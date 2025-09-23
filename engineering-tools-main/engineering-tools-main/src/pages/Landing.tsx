import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Brain, Dna, Sparkles, BookOpen, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ModelViewer from '../components/ModelViewer';

const Landing: React.FC = () => {
  const { t } = useLanguage();

  const models = [
    {
      name: 'Heart',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      description: 'Interactive cardiac anatomy with real-time visualization',
      modelType: 'heart' as const
    },
    {
      name: 'Brain',
      icon: Brain,
      color: 'from-purple-400 to-blue-500',
      description: 'Neural pathways and brain structure exploration',
      modelType: 'brain' as const
    },
    {
      name: 'DNA',
      icon: Dna,
      color: 'from-green-400 to-blue-400',
      description: 'Genetic structure and molecular interactions',
      modelType: 'dna' as const
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Theory',
      description: 'In-depth theoretical knowledge with practical applications'
    },
    {
      icon: FlaskConical,
      title: 'Virtual Labs',
      description: 'Hands-on experience with Arduino, DSP, and 3D printing'
    },
    {
      icon: Sparkles,
      title: 'Interactive Learning',
      description: '3D models, animations, and real-time simulations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                {t('landing.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              {t('landing.subtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              {t('landing.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/theory"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {t('landing.cta')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <div className="flex items-center px-6 py-3 bg-green-100 text-green-800 font-medium rounded-lg">
                <Sparkles className="h-5 w-5 mr-2" />
                {t('landing.free')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Models Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive 3D Models
            </h2>
            <p className="text-xl text-gray-600">
              Explore biomedical structures with cutting-edge 3D visualization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => {
              const Icon = model.icon;
              return (
                <div key={model.name} className="group">
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform group-hover:scale-105">
                    <div className="h-64 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-10`} />
                      <ModelViewer
                        alt={model.name}
                        className="w-full h-full"
                        autoRotate={true}
                        cameraControls={true}
                        modelType={model.modelType}
                      />
                      <div className="absolute top-4 right-4">
                        <Icon className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.name}</h3>
                      <p className="text-gray-600">{model.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ME Whisper?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced tools designed specifically for biomedical engineering education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-xl mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-pink-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of biomedical engineering students who are advancing their education with ME Whisper.
          </p>
          <Link
            to="/theory"
            className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Your Journey
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;