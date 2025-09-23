import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Lock, Activity, Users, Clock, Ban } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SecurityLog {
  id: string;
  timestamp: Date;
  type: 'login' | 'access' | 'suspicious' | 'trap';
  ip: string;
  userAgent: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface TrapAttempt {
  id: string;
  timestamp: Date;
  ip: string;
  attempts: number;
  blocked: boolean;
}

const Security: React.FC = () => {
  const { t } = useLanguage();
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [trapAttempts, setTrapAttempts] = useState<TrapAttempt[]>([]);
  const [trapCode, setTrapCode] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useEffect(() => {
    // Load security logs from localStorage
    const storedLogs = localStorage.getItem('security-logs');
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs).map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp)
      }));
      setSecurityLogs(parsedLogs);
    } else {
      // Generate sample security logs
      const sampleLogs = generateSampleLogs();
      setSecurityLogs(sampleLogs);
      localStorage.setItem('security-logs', JSON.stringify(sampleLogs));
    }

    // Load trap attempts
    const storedTraps = localStorage.getItem('trap-attempts');
    if (storedTraps) {
      const parsedTraps = JSON.parse(storedTraps).map((trap: any) => ({
        ...trap,
        timestamp: new Date(trap.timestamp)
      }));
      setTrapAttempts(parsedTraps);
    }
  }, []);

  const generateSampleLogs = (): SecurityLog[] => {
    const sampleIPs = ['192.168.1.100', '10.0.0.55', '172.16.0.10', '203.0.113.42', '198.51.100.15'];
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15'
    ];

    return Array.from({ length: 15 }, (_, i) => ({
      id: (i + 1).toString(),
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
      type: ['login', 'access', 'suspicious', 'trap'][Math.floor(Math.random() * 4)] as any,
      ip: sampleIPs[Math.floor(Math.random() * sampleIPs.length)],
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      description: [
        'User login attempt',
        'Accessed sensitive data',
        'Multiple failed login attempts',
        'Unusual access pattern detected',
        'Trap code execution attempt',
        'Unauthorized API access',
        'Suspicious file download'
      ][Math.floor(Math.random() * 7)],
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
    }));
  };

  const executeTrapCode = () => {
    if (!trapCode.trim()) {
      alert('Please enter some code to execute');
      return;
    }

    // Log the trap attempt
    const newLog: SecurityLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'trap',
      ip: '127.0.0.1', // Simulated IP
      userAgent: navigator.userAgent,
      description: `Trap code execution: "${trapCode.slice(0, 50)}..."`,
      severity: 'high'
    };

    const newTrapAttempt: TrapAttempt = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ip: '127.0.0.1',
      attempts: 1,
      blocked: true
    };

    const updatedLogs = [newLog, ...securityLogs];
    const updatedTraps = [newTrapAttempt, ...trapAttempts];

    setSecurityLogs(updatedLogs);
    setTrapAttempts(updatedTraps);

    // Save to localStorage
    localStorage.setItem('security-logs', JSON.stringify(updatedLogs));
    localStorage.setItem('trap-attempts', JSON.stringify(updatedTraps));

    // Show fake execution result
    setTimeout(() => {
      alert('🚨 SECURITY ALERT: Unauthorized code execution detected!\n\nThis attempt has been logged and blocked for security purposes.\n\nIP Address: 127.0.0.1\nTimestamp: ' + new Date().toLocaleString());
    }, 500);

    setTrapCode('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return <Users className="h-4 w-4" />;
      case 'access': return <Eye className="h-4 w-4" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4" />;
      case 'trap': return <Ban className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const stats = {
    totalLogs: securityLogs.length,
    highSeverity: securityLogs.filter(log => log.severity === 'high').length,
    trapAttempts: trapAttempts.length,
    blockedIPs: new Set(trapAttempts.map(trap => trap.ip)).size
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="h-10 w-10 text-green-500 mr-4" />
          Security Center
        </h1>
        <p className="text-xl text-gray-600">
          Monitor platform security and test trap code mechanisms
        </p>
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Logs</p>
              <p className="text-3xl font-bold">{stats.totalLogs}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">High Severity</p>
              <p className="text-3xl font-bold">{stats.highSeverity}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Trap Attempts</p>
              <p className="text-3xl font-bold">{stats.trapAttempts}</p>
            </div>
            <Ban className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">System Status</p>
              <p className="text-lg font-bold">SECURE</p>
            </div>
            <Shield className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trap Code Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="h-6 w-6 text-red-500 mr-2" />
            Security Trap Code
          </h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Warning</h3>
                <p className="text-yellow-700 text-sm">
                  This is a security demonstration. Any code execution attempts will be logged and monitored.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Code to Execute:
              </label>
              <textarea
                value={trapCode}
                onChange={(e) => setTrapCode(e.target.value)}
                placeholder="// Try entering some code here..."
                className="w-full h-32 p-3 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <button
              onClick={executeTrapCode}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Execute Code
            </button>
          </div>
          
          {trapAttempts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Trap Attempts:</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {trapAttempts.slice(0, 5).map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-2 bg-red-50 rounded text-sm">
                    <span className="text-red-700">IP: {attempt.ip}</span>
                    <span className="text-red-600 font-medium">BLOCKED</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 text-blue-500 mr-2" />
            Security Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Security Alerts</h3>
                <p className="text-sm text-gray-600">Receive notifications for security events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertsEnabled}
                  onChange={(e) => setAlertsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Show Security Logs</h3>
                <p className="text-sm text-gray-600">Display detailed security event logs</p>
              </div>
              <button
                onClick={() => setShowLogs(!showLogs)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showLogs 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showLogs ? 'Hide' : 'Show'} Logs
              </button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Firewall Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Intrusion Detection</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ENABLED
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Code Execution Traps</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ARMED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      {showLogs && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="h-6 w-6 text-gray-500 mr-2" />
            Security Event Logs
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {securityLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getTypeIcon(log.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{log.description}</h3>
                      <p className="text-sm text-gray-600">
                        {log.ip} • {log.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                    {log.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2 truncate">
                  User Agent: {log.userAgent}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Security Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">For Students:</h3>
            <ul className="text-sm opacity-90 space-y-1">
              <li>• Use strong, unique passwords</li>
              <li>• Don't share account credentials</li>
              <li>• Report suspicious activities</li>
              <li>• Keep software updated</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">For Administrators:</h3>
            <ul className="text-sm opacity-90 space-y-1">
              <li>• Monitor security logs regularly</li>
              <li>• Implement access controls</li>
              <li>• Use multi-factor authentication</li>
              <li>• Regular security audits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;