import React, { useEffect, useRef } from 'react';
import { Heart, Brain, Dna } from 'lucide-react';

interface ModelViewerProps {
  src?: string;
  alt: string;
  className?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  modelType?: 'heart' | 'brain' | 'dna';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'disable-zoom'?: boolean;
        'rotation-per-second'?: string;
        loading?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  src = '', 
  alt, 
  className = '',
  autoRotate = true,
  cameraControls = true,
  modelType = 'heart'
}) => {
  const viewerRef = useRef<HTMLElement>(null);

  // Enhanced 3D CSS models with specific shapes for each type
  const getModelStyles = () => {
    const baseStyle = {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '20px',
    };

    switch (modelType) {
      case 'heart':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a52, #ff8a80)',
        };
      case 'brain':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #667eea, #764ba2, #a8edea)',
        };
      case 'dna':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #11998e, #38ef7d, #00d2ff)',
        };
      default:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #ec4899, #3b82f6)',
        };
    }
  };

  const renderFallbackModel = () => {
    const IconComponent = modelType === 'heart' ? Heart : modelType === 'brain' ? Brain : Dna;
    
    return (
      <div style={getModelStyles()}>
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white opacity-30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Main 3D Model Container */}
        <div className="relative z-10 transform-gpu">
          {modelType === 'heart' && (
            <div className="relative">
              {/* Heart Shape */}
              <div 
                className="w-24 h-24 relative animate-pulse"
                style={{
                  animation: 'heartbeat 1.5s ease-in-out infinite',
                }}
              >
                <Heart 
                  className="w-full h-full text-white drop-shadow-2xl" 
                  fill="currentColor"
                />
                {/* Pulse rings */}
                <div className="absolute inset-0 border-4 border-white opacity-30 rounded-full animate-ping" />
                <div className="absolute inset-2 border-2 border-white opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
              {/* ECG Line */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white opacity-60">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
              </div>
            </div>
          )}
          
          {modelType === 'brain' && (
            <div className="relative">
              {/* Brain Shape */}
              <div 
                className="w-24 h-24 relative"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <Brain 
                  className="w-full h-full text-white drop-shadow-2xl" 
                  fill="currentColor"
                />
                {/* Neural network lines */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-8 bg-white opacity-40"
                      style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                        transform: `rotate(${i * 45}deg)`,
                        animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Brainwave */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-80">
                ∿∿∿ Neural Activity ∿∿∿
              </div>
            </div>
          )}
          
          {modelType === 'dna' && (
            <div className="relative">
              {/* DNA Double Helix */}
              <div 
                className="w-24 h-24 relative"
                style={{
                  animation: 'rotate 8s linear infinite',
                }}
              >
                <Dna 
                  className="w-full h-full text-white drop-shadow-2xl" 
                  fill="currentColor"
                />
                {/* DNA Strands */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${30 + Math.sin(i * 0.8) * 20}%`,
                        top: `${20 + i * 10}%`,
                        animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Genetic Code */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-80 font-mono">
                ATCG-TAGC
              </div>
            </div>
          )}
        </div>
        
        {/* Model Label */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg drop-shadow-lg">
          {alt}
        </div>
      </div>
    );
  };
  useEffect(() => {
    // Add enhanced CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
      }
      
      @keyframes rotate {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
      }
      
      @keyframes twinkle {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Always use fallback for now since we don't have actual 3D model files
  return <div className={className}>{renderFallbackModel()}</div>;

  return (
    <model-viewer
      ref={viewerRef}
      src={src}
      alt={alt}
      auto-rotate={autoRotate}
      camera-controls={cameraControls}
      disable-zoom={false}
      rotation-per-second="30deg"
      loading="eager"
      className={className}
      style={{ width: '100%', height: '100%', minHeight: '200px' }}
    />
  );
};

export default ModelViewer;