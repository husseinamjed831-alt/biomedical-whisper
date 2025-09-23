import React from 'react';
import { FileText, BarChart3, Presentation, Palette, ExternalLink, Download, HelpCircle, Cpu, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const OfficeTools: React.FC = () => {
  const { t } = useLanguage();

  const tools = [
    {
      name: 'Microsoft Word Online',
      description: 'Professional document creation and editing with templates',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      url: 'https://office.live.com/start/Word.aspx',
      features: [
        'Professional document templates',
        'Lab report and research paper formats',
        'Real-time collaboration',
        'Advanced formatting and styles'
      ]
    },
    {
      name: 'Microsoft Excel Online',
      description: 'Advanced data analysis and statistical calculations',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      url: 'https://office.live.com/start/Excel.aspx',
      features: [
        'Advanced statistical functions',
        'Data visualization and charts',
        'Pivot tables and analysis',
        'Scientific calculation templates'
      ]
    },
    {
      name: 'Microsoft PowerPoint Online',
      description: 'Professional presentations with scientific templates',
      icon: Presentation,
      color: 'from-orange-500 to-red-500',
      url: 'https://office.live.com/start/PowerPoint.aspx',
      features: [
        'Scientific presentation templates',
        'Advanced animations and transitions',
        'Medical diagram integration',
        'Research presentation formats'
      ]
    },
    {
      name: 'Canva Pro',
      description: 'Professional design for scientific posters and infographics',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      url: 'https://www.canva.com/',
      features: [
        'Scientific poster templates',
        'Medical infographic designs',
        'Research presentation graphics',
        'Professional diagram tools'
      ]
    },
    {
      name: 'ChatGPT AI Assistant',
      description: 'AI assistant for research, writing, and problem solving',
      icon: HelpCircle,
      color: 'from-green-400 to-blue-500',
      url: 'https://chat.openai.com/',
      features: [
        'Research assistance and writing',
        'Code debugging and explanation',
        'Scientific concept clarification',
        'Study plan and note organization'
      ]
    },
    {
      name: 'Hugging Face AI Hub',
      description: 'AI models and machine learning tools for research',
      icon: Cpu,
      color: 'from-yellow-400 to-orange-500',
      url: 'https://huggingface.co/',
      features: [
        'Pre-trained AI models',
        'Natural language processing',
        'Computer vision tools',
        'Medical AI applications'
      ]
    },
    {
      name: 'Gamma Presentation AI',
      description: 'AI-powered presentation and report generator',
      icon: Presentation,
      color: 'from-teal-500 to-cyan-500',
      url: 'https://gamma.app/',
      features: [
        'AI-generated presentations',
        'Scientific report templates',
        'Interactive content creation',
        'Professional design automation'
      ]
    },
    {
      name: 'Microsoft Office 365 Suite',
      description: 'Complete office suite with Word, Excel, PowerPoint',
      icon: BarChart3,
      color: 'from-blue-600 to-indigo-600',
      url: 'https://office.com/',
      features: [
        'Word for document creation',
        'Excel for data analysis',
        'PowerPoint for presentations',
        'OneDrive cloud storage'
      ]
    },
    {
      name: 'Canva Design Platform',
      description: 'Professional design for posters, reports, and graphics',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      url: 'https://www.canva.com/',
      features: [
        'Scientific poster templates',
        'Medical infographic designs',
        'Research presentation graphics',
        'Professional report layouts'
      ]
    }
  ];

  const templates = [
    {
      name: 'Biomedical Lab Report',
      type: 'Microsoft Word',
      description: 'Professional template for biomedical engineering lab reports',
      downloadUrl: 'https://office.live.com/start/Word.aspx'
    },
    {
      name: 'Statistical Analysis Template',
      type: 'Microsoft Excel',
      description: 'Advanced spreadsheet for biomedical data analysis',
      downloadUrl: 'https://office.live.com/start/Excel.aspx'
    },
    {
      name: 'Scientific Research Presentation',
      type: 'Microsoft PowerPoint',
      description: 'Professional template for biomedical research presentations',
      downloadUrl: 'https://office.live.com/start/PowerPoint.aspx'
    },
    {
      name: 'Medical Research Poster',
      type: 'Canva Pro',
      description: 'Professional poster template for medical conferences',
      downloadUrl: 'https://www.canva.com/create/posters/'
    },
    {
      name: 'AI Research Assistant',
      type: 'ChatGPT',
      description: 'AI-powered research and writing assistance',
      downloadUrl: 'https://chat.openai.com/'
    },
    {
      name: 'ML Model Library',
      type: 'Hugging Face',
      description: 'Pre-trained models for biomedical applications',
      downloadUrl: 'https://huggingface.co/models'
    }
  ];

  const quickActions = [
    { name: 'New Lab Report', tool: 'Microsoft Word', action: 'Professional template', url: 'https://office.com/' },
    { name: 'Data Analysis', tool: 'Microsoft Excel', action: 'Statistical analysis', url: 'https://office.com/' },
    { name: 'Research Presentation', tool: 'PowerPoint', action: 'Scientific slides', url: 'https://office.com/' },
    { name: 'AI Assistant', tool: 'ChatGPT', action: 'Research help', url: 'https://chat.openai.com/' },
    { name: 'Design Poster', tool: 'Canva', action: 'Scientific poster', url: 'https://www.canva.com/' },
    { name: 'ML Models', tool: 'Hugging Face', action: 'AI research', url: 'https://huggingface.co/' },
    { name: 'AI Presentation', tool: 'Gamma', action: 'Smart slides', url: 'https://gamma.app/' },
    { name: 'Office Suite', tool: 'Microsoft 365', action: 'Full suite', url: 'https://office.com/' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Office Tools Suite
        </h1>
        <p className="text-xl text-gray-600">
          Professional productivity tools for your biomedical engineering studies and projects
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-all duration-200 text-left block"
            >
              <div className="font-semibold">{action.name}</div>
              <div className="text-sm opacity-90">{action.tool}</div>
              <div className="text-xs opacity-75 mt-1">{action.action}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${tool.color} relative p-6`}>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <Icon className="h-8 w-8 mb-2" />
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                  </div>
                  <ExternalLink className="h-6 w-6 opacity-75" />
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r ${tool.color} text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200`}
                >
                  <span>Open {tool.name}</span>
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Templates Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready-to-Use Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-pink-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-pink-600 font-medium">{template.type}</p>
                </div>
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-4">{template.description}</p>
              
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <Download className="h-4 w-4 mr-2" />
                <a href={template.downloadUrl} target="_blank" rel="noopener noreferrer">
                  Open Template
                </a>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Benefits */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Professional Tools Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Microsoft 365</h3>
            <p className="text-gray-600">Professional Word, Excel, PowerPoint integration</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Assistance</h3>
            <p className="text-gray-600">ChatGPT and Hugging Face for research support</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Presentation className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Tools</h3>
            <p className="text-gray-600">Canva Pro for scientific posters and graphics</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600">Advanced reporting and data visualization</p>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Getting Started?</h2>
          <p className="text-lg opacity-90 mb-6">
            Access our comprehensive tutorials and guides for each tool
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                <tool.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                <div className="text-sm font-medium">{tool.name} Tutorial</div>
                <div className="text-xs opacity-75 mt-1">Step-by-step guide</div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:shadow-md transition-all duration-200">
            View All Tutorials
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeTools;