import React, { useState } from 'react';
import { Cpu, Printer, Zap, Heart, Play, Download, FileText, Eye, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Labs: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  const labs = [
    {
      id: 'arduino',
      name: 'Arduino Biomedical Lab',
      icon: Cpu,
      color: 'from-blue-500 to-teal-500',
      description: 'Build biomedical devices using Arduino microcontrollers and sensors',
      experiments: [
        'Heart Rate Monitor with Pulse Sensor',
        'ECG Signal Acquisition System',
        'Temperature and Blood Pressure Monitor',
        'Biomedical Data Logger',
        'Automated Pill Dispenser',
        'Respiratory Rate Monitor'
      ],
      equipment: ['Arduino Uno/Nano', 'Pulse Sensor', 'ECG Module', 'LCD Display', 'Bluetooth Module', 'Various Sensors'],
      difficulty: 'Beginner to Advanced',
      labUrl: 'https://www.tinkercad.com/circuits'
    },
    {
      id: '3d-printer',
      name: '3D Printing Medical Lab',
      icon: Printer,
      color: 'from-purple-500 to-pink-500',
      description: 'Design and 3D print medical devices, prosthetics, and anatomical models',
      experiments: [
        'Custom Prosthetic Hand Design',
        '3D Heart Model for Surgery Planning',
        'Medical Device Prototyping',
        'Anatomical Teaching Models',
        'Surgical Guide Templates',
        'Orthopedic Implant Design'
      ],
      equipment: ['3D Printer (FDM/SLA)', 'Fusion 360', 'PLA/PETG Filaments', 'Calipers', 'Post-processing Tools'],
      difficulty: 'Intermediate',
      labUrl: 'https://www.thingiverse.com/education'
    },
    {
      id: 'dsp',
      name: 'Digital Signal Processing Lab',
      icon: Zap,
      color: 'from-yellow-500 to-red-500',
      description: 'Process and analyze biomedical signals using advanced DSP techniques',
      experiments: [
        'ECG Signal Filtering and Analysis',
        'EEG Brain Wave Processing',
        'EMG Muscle Signal Analysis',
        'Medical Image Enhancement',
        'Heart Sound Analysis',
        'Blood Pressure Waveform Processing'
      ],
      equipment: ['MATLAB/Simulink', 'Python/SciPy', 'Signal Generators', 'Oscilloscopes', 'Data Acquisition Cards'],
      difficulty: 'Advanced',
      labUrl: 'https://www.mathworks.com/academia/student-competitions.html'
    },
    {
      id: 'anatomy-physiology',
      name: 'Virtual Anatomy & Physiology Lab',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      description: 'Interactive virtual dissection and physiological system analysis',
      experiments: [
        'Virtual Heart Dissection and Analysis',
        'Brain Structure and Function Study',
        'Respiratory System Mechanics',
        'Cardiovascular Hemodynamics',
        'Nervous System Signal Transmission',
        'Muscle Contraction Physiology'
      ],
      equipment: ['Virtual Reality Headsets', '3D Anatomy Software', 'Physiological Simulators', 'Interactive Models'],
      difficulty: 'All Levels',
      labUrl: 'https://www.visiblebody.com/'
    },
    {
      id: 'medical-imaging',
      name: 'Medical Imaging Lab',
      icon: Eye,
      color: 'from-indigo-500 to-blue-500',
      description: 'Learn medical imaging techniques including MRI, CT, and ultrasound',
      experiments: [
        'MRI Image Reconstruction',
        'CT Scan Analysis and Processing',
        'Ultrasound Image Enhancement',
        'X-ray Image Processing',
        'DICOM File Handling',
        '3D Medical Image Visualization'
      ],
      equipment: ['ImageJ Software', 'MATLAB Image Processing', 'DICOM Viewers', 'Sample Medical Images'],
      difficulty: 'Intermediate to Advanced',
      labUrl: 'https://imagej.nih.gov/ij/'
    },
    {
      id: 'biomechanics',
      name: 'Biomechanics Lab',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      description: 'Study human movement and mechanical properties of biological systems',
      experiments: [
        'Gait Analysis and Motion Capture',
        'Force Plate Analysis',
        'Joint Kinematics Study',
        'Muscle Force Estimation',
        'Prosthetic Gait Analysis',
        'Sports Biomechanics'
      ],
      equipment: ['Motion Capture System', 'Force Plates', 'EMG Sensors', 'Biomechanics Software'],
      difficulty: 'Advanced',
      labUrl: 'https://www.opensim.stanford.edu/'
    }
  ];

  const LabCard: React.FC<{ lab: typeof labs[0] }> = ({ lab }) => {
    const Icon = lab.icon;
    const isSelected = selectedLab === lab.id;
    
    return (
      <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform ${
        isSelected ? 'scale-105 ring-4 ring-pink-200' : 'hover:scale-102'
      }`}>
        <div className={`h-32 bg-gradient-to-br ${lab.color} relative`}>
          <div className="absolute inset-0 bg-black bg-opacity-10" />
          <div className="absolute bottom-4 left-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-medium rounded-full">
              {lab.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{lab.name}</h3>
          <p className="text-gray-600 mb-4">{lab.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Key Experiments:</h4>
            <ul className="space-y-1">
              {lab.experiments.slice(0, 3).map((exp, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  {exp}
                </li>
              ))}
              {lab.experiments.length > 3 && (
                <li className="text-sm text-gray-500 italic">
                  +{lab.experiments.length - 3} more experiments
                </li>
              )}
            </ul>
          </div>
          
          <button
            onClick={() => setSelectedLab(isSelected ? null : lab.id)}
            className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200"
          >
            {isSelected ? 'Close Details' : 'View Lab Details'}
          </button>
        </div>
      </div>
    );
  };

  const selectedLabData = labs.find(lab => lab.id === selectedLab);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Virtual Laboratories
        </h1>
        <p className="text-xl text-gray-600">
          Hands-on experience with cutting-edge biomedical engineering tools and techniques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      {selectedLabData && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedLabData.color} mr-4`}>
              <selectedLabData.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedLabData.name}</h2>
              <p className="text-gray-600">{selectedLabData.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Play className="h-5 w-5 mr-2 text-pink-500" />
                All Experiments
              </h3>
              <div className="space-y-3">
                {selectedLabData.experiments.map((exp, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">{exp}</span>
                    <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Equipment & Resources
              </h3>
              <div className="space-y-3 mb-6">
                {selectedLabData.equipment.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-blue-900 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200">
                  <Download className="h-5 w-5 mr-2" />
                  Download Lab Manual
                </button>
                <a
                  href={selectedLabData.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Virtual Lab
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Lab Safety & Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Virtual Lab Benefits</h3>
            <ul className="space-y-2 opacity-90">
              <li>• Safe learning environment</li>
              <li>• Unlimited experiment repetitions</li>
              <li>• Real-time data visualization</li>
              <li>• Cost-effective practical training</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
            <ul className="space-y-2 opacity-90">
              <li>• Follow experiment protocols</li>
              <li>• Document your observations</li>
              <li>• Review safety procedures</li>
              <li>• Ask for help when needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;