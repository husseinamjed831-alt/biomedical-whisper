import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Trophy, Target, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WeeklyData {
  week: number;
  grade: number;
  completed: boolean;
  subjects: {
    anatomy: number;
    physiology: number;
    math: number;
    circuits: number;
  };
}

const Evaluation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

  useEffect(() => {
    // Load or generate weekly evaluation data
    const storedData = localStorage.getItem('weekly-evaluations');
    if (storedData) {
      setWeeklyData(JSON.parse(storedData));
    } else {
      // Generate sample data
      const sampleData: WeeklyData[] = Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        grade: i < 4 ? Math.floor(Math.random() * 20) + 75 : 0,
        completed: i < 4,
        subjects: {
          anatomy: i < 4 ? Math.floor(Math.random() * 20) + 75 : 0,
          physiology: i < 4 ? Math.floor(Math.random() * 20) + 75 : 0,
          math: i < 4 ? Math.floor(Math.random() * 20) + 75 : 0,
          circuits: i < 4 ? Math.floor(Math.random() * 20) + 75 : 0,
        }
      }));
      setWeeklyData(sampleData);
      localStorage.setItem('weekly-evaluations', JSON.stringify(sampleData));
    }
  }, []);

  const getCurrentWeek = () => {
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.ceil(diffDays / 7), 12);
  };

  const getOverallGrade = () => {
    const completedWeeks = weeklyData.filter(week => week.completed);
    if (completedWeeks.length === 0) return 0;
    
    const totalGrade = completedWeeks.reduce((sum, week) => sum + week.grade, 0);
    return Math.round(totalGrade / completedWeeks.length);
  };

  const getSubjectAverage = (subject: keyof WeeklyData['subjects']) => {
    const completedWeeks = weeklyData.filter(week => week.completed);
    if (completedWeeks.length === 0) return 0;
    
    const total = completedWeeks.reduce((sum, week) => sum + week.subjects[subject], 0);
    return Math.round(total / completedWeeks.length);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return 'text-green-600';
    if (grade >= 70) return 'text-blue-600';
    if (grade >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressPercentage = () => {
    const currentWeek = getCurrentWeek();
    return Math.min((currentWeek / 12) * 100, 100);
  };

  const subjects = [
    { key: 'anatomy' as const, name: 'Anatomy', color: 'bg-red-500' },
    { key: 'physiology' as const, name: 'Physiology', color: 'bg-purple-500' },
    { key: 'math' as const, name: 'Mathematics', color: 'bg-blue-500' },
    { key: 'circuits' as const, name: 'Circuits', color: 'bg-yellow-500' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-10 w-10 text-pink-500 mr-4" />
          Weekly Evaluation
        </h1>
        <p className="text-xl text-gray-600">
          Track your academic progress and performance across all subjects
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Overall Grade</p>
              <p className="text-3xl font-bold">{getOverallGrade()}%</p>
            </div>
            <Trophy className="h-8 w-8 text-pink-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Current Week</p>
              <p className="text-3xl font-bold">{getCurrentWeek()}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Progress</p>
              <p className="text-3xl font-bold">{Math.round(getProgressPercentage())}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Completed Weeks</p>
              <p className="text-3xl font-bold">{weeklyData.filter(w => w.completed).length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Semester Progress</h2>
          <span className="text-lg font-semibold text-gray-600">{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-pink-500 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Week 1</span>
          <span>Week 6</span>
          <span>Week 12 (Final)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Performance Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Performance</h2>
          <div className="space-y-4">
            {weeklyData.slice(0, 8).map((week) => (
              <div key={week.week} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-600">
                  Week {week.week}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Grade</span>
                    <span className={`text-sm font-semibold ${getGradeColor(week.grade)}`}>
                      {week.completed ? `${week.grade}%` : 'Pending'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        week.grade >= 85 ? 'bg-green-500' :
                        week.grade >= 70 ? 'bg-blue-500' :
                        week.grade >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: week.completed ? `${week.grade}%` : '0%' }}
                    />
                  </div>
                </div>
                {week.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Averages</h2>
          <div className="space-y-6">
            {subjects.map((subject) => {
              const average = getSubjectAverage(subject.key);
              return (
                <div key={subject.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${subject.color} mr-3`} />
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                    <span className={`font-semibold ${getGradeColor(average)}`}>
                      {average}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${subject.color}`}
                      style={{ width: `${average}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Week View */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Weekly Details</h2>
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {weeklyData.map((week) => (
              <option key={week.week} value={week.week}>
                Week {week.week} {week.completed ? `(${week.grade}%)` : '(Pending)'}
              </option>
            ))}
          </select>
        </div>

        {(() => {
          const selectedWeekData = weeklyData.find(w => w.week === selectedWeek);
          if (!selectedWeekData) return null;

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject) => (
                <div key={subject.key} className="text-center">
                  <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}>
                    {selectedWeekData.completed ? selectedWeekData.subjects[subject.key] : '?'}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{subject.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedWeekData.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Achievement Section */}
      <div className="mt-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-4">Keep Up the Great Work!</h2>
          <p className="text-lg opacity-90 mb-6">
            You're making excellent progress in your biomedical engineering studies. 
            Stay consistent and you'll achieve your academic goals.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{getOverallGrade()}%</div>
              <div className="text-sm opacity-80">Current Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{getCurrentWeek()}/12</div>
              <div className="text-sm opacity-80">Weeks Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {weeklyData.filter(w => w.completed && w.grade >= 85).length}
              </div>
              <div className="text-sm opacity-80">A Grades</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;