import React, { useState, useEffect } from 'react';
import { Heart, Users, DollarSign, Gift, Star, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Donation {
  id: string;
  amount: number;
  message: string;
  timestamp: Date;
  anonymous: boolean;
}

const Donations: React.FC = () => {
  const { t } = useLanguage();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [newDonation, setNewDonation] = useState({
    amount: '',
    message: '',
    anonymous: true
  });
  const [totalRaised, setTotalRaised] = useState(0);
  const [goalAmount] = useState(50000); // Goal of $50,000

  useEffect(() => {
    // Load donations from localStorage
    const storedDonations = localStorage.getItem('donations');
    if (storedDonations) {
      const parsedDonations = JSON.parse(storedDonations).map((d: any) => ({
        ...d,
        timestamp: new Date(d.timestamp)
      }));
      setDonations(parsedDonations);
      
      // Calculate total
      const total = parsedDonations.reduce((sum: number, d: Donation) => sum + d.amount, 0);
      setTotalRaised(total);
    } else {
      // Generate some sample donations
      const sampleDonations = [
        {
          id: '1',
          amount: 100,
          message: 'Great educational platform! Keep up the excellent work.',
          timestamp: new Date(Date.now() - 86400000 * 2),
          anonymous: false
        },
        {
          id: '2',
          amount: 50,
          message: 'Thank you for making biomedical education accessible.',
          timestamp: new Date(Date.now() - 86400000 * 5),
          anonymous: true
        },
        {
          id: '3',
          amount: 200,
          message: 'Love the 3D models and interactive features!',
          timestamp: new Date(Date.now() - 86400000 * 7),
          anonymous: false
        },
        {
          id: '4',
          amount: 75,
          message: '',
          timestamp: new Date(Date.now() - 86400000 * 10),
          anonymous: true
        }
      ];
      
      setDonations(sampleDonations);
      const total = sampleDonations.reduce((sum, d) => sum + d.amount, 0);
      setTotalRaised(total);
      localStorage.setItem('donations', JSON.stringify(sampleDonations));
    }
  }, []);

  const handleDonate = () => {
    const amount = parseFloat(newDonation.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    const donation: Donation = {
      id: Date.now().toString(),
      amount,
      message: newDonation.message,
      timestamp: new Date(),
      anonymous: newDonation.anonymous
    };

    const updatedDonations = [donation, ...donations];
    setDonations(updatedDonations);
    setTotalRaised(prev => prev + amount);
    
    // Save to localStorage
    localStorage.setItem('donations', JSON.stringify(updatedDonations));
    
    // Reset form
    setNewDonation({ amount: '', message: '', anonymous: true });
    
    // Show thank you message
    alert('Thank you for your generous donation! 🎉');
  };

  const progressPercentage = Math.min((totalRaised / goalAmount) * 100, 100);
  const donorCount = donations.length;
  const averageDonation = donorCount > 0 ? totalRaised / donorCount : 0;

  const quickAmounts = [25, 50, 100, 250, 500];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <Heart className="h-10 w-10 text-pink-500 mr-4" />
          Help Students in Need
        </h1>
        <p className="text-xl text-gray-600">
          Anonymous donations to support students and people in need - completely confidential
        </p>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Community Support Fund</h2>
          <p className="text-pink-100">Anonymous donations to help students and people in need</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold">${totalRaised.toLocaleString()}</span>
            <span className="text-lg">${goalAmount.toLocaleString()} goal</span>
          </div>
          
          <div className="w-full bg-white bg-opacity-20 rounded-full h-6 mb-6">
            <div 
              className="bg-white h-6 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">{donorCount}</div>
              <div className="text-pink-100">Anonymous Donors</div>
            </div>
            <div>
              <div className="text-2xl font-bold">${Math.round(averageDonation)}</div>
              <div className="text-blue-100">Average</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-purple-100">Collected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gift className="h-6 w-6 text-pink-500 mr-2" />
            Make Anonymous Donation
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Donation Amount (USD)
              </label>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setNewDonation(prev => ({ ...prev, amount: amount.toString() }))}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      newDonation.amount === amount.toString()
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={newDonation.amount}
                  onChange={(e) => setNewDonation(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter custom amount"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="1"
                  step="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anonymous Message (Optional)
              </label>
              <textarea
                value={newDonation.message}
                onChange={(e) => setNewDonation(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Share an anonymous message of support..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {newDonation.message.length}/200 characters
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={newDonation.anonymous}
                onChange={(e) => setNewDonation(prev => ({ ...prev, anonymous: e.target.checked }))}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                Keep donation completely anonymous (recommended)
              </label>
            </div>

            <button
              onClick={handleDonate}
              disabled={!newDonation.amount}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart className="inline-block h-5 w-5 mr-2" />
              Donate ${newDonation.amount || '0'}
            </button>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-2" />
            Recent Anonymous Support
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {donations.map((donation) => (
              <div key={donation.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {donation.anonymous ? '?' : 'D'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {donation.anonymous ? 'Anonymous Supporter' : 'Kind Donor'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {donation.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${donation.amount}
                    </p>
                  </div>
                </div>
                
                {donation.message && (
                  <p className="text-gray-700 text-sm italic">
                    "{donation.message}"
                  </p>
                )}
              </div>
            ))}
            
            {donations.length === 0 && (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No donations yet. Be the first to help!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How Donations Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Support</h3>
            <p className="text-gray-600">Direct financial assistance to students in need</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Care</h3>
            <p className="text-gray-600">Help people in difficult situations anonymously</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Privacy</h3>
            <p className="text-gray-600">All donations are completely anonymous and secure</p>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="mt-8 text-center bg-white rounded-2xl shadow-lg p-8">
        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You Anonymous Supporters!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Every anonymous donation makes a real difference in someone's life. 
          Your generosity helps students and people in need while maintaining complete privacy 
          and confidentiality for both donors and recipients.
        </p>
      </div>
    </div>
  );
};

export default Donations;