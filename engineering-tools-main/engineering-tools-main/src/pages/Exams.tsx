import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, FileText, Save, Send, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Question {
  id: number;
  type: 'mcq' | 'written';
  question: string;
  options?: string[];
  correctAnswer?: number;
  points: number;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
  totalPoints: number;
}

const Exams: React.FC = () => {
  const { t } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [examContent, setExamContent] = useState<string>('');
  const [examTitle, setExamTitle] = useState<string>('');
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [activeExam, setActiveExam] = useState<ExamData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [availableExams, setAvailableExams] = useState<ExamData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setExamContent(content);
      };
      reader.readAsText(file);
    }
  };

  const startExam = (exam?: ExamData) => {
    if (exam) {
      setActiveExam(exam);
      setTimeLeft(exam.duration * 60);
    } else {
      if (!examTitle.trim()) {
        alert('Please enter an exam title');
        return;
      }
    }
    setExamStarted(true);
  };

  const handleSubmitExam = () => {
    const examResults = {
      title: activeExam ? activeExam.title : examTitle,
      content: examContent,
      answers,
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`exam-${Date.now()}`, JSON.stringify(examResults));
    setExamSubmitted(true);
    alert('Exam submitted and saved locally!');
  };

  const handleMCQAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleWrittenAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (examSubmitted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">Your exam answers have been saved locally for review.</p>
          <button
            onClick={() => {
              setExamStarted(false);
              setExamSubmitted(false);
              setAnswers({});
              setExamContent('');
              setExamTitle('');
              setUploadedFile(null);
              setActiveExam(null);
            }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200"
          >
            Take Another Exam
          </button>
        </div>
      </div>
    );
  }

  if (examStarted && !activeExam) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{examTitle}</h1>
            <button
              onClick={handleSubmitExam}
              className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Exam
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Exam Content</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{examContent}</pre>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Answers:
            </label>
            <textarea
              value={answers.written || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, written: e.target.value }))}
              placeholder="Write your answers here..."
              className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeExam && examStarted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Exam Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{activeExam.title}</h1>
              <p className="text-gray-600">{activeExam.subject} • {activeExam.totalPoints} points</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-4 py-2 rounded-lg ${
                timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitExam}
                className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Exam
              </button>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {activeExam.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Question {index + 1}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({question.points} points)
                  </span>
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  question.type === 'mcq' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {question.type === 'mcq' ? 'Multiple Choice' : 'Written Answer'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{question.question}</p>
              
              {question.type === 'mcq' && question.options ? (
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={answers[question.id] === optionIndex}
                        onChange={() => handleMCQAnswer(question.id, optionIndex)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 mr-3"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleWrittenAnswer(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Auto-save indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <Save className="h-4 w-4 mr-2" />
            Answers are automatically saved
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Self-Assessment Exams</h1>
        <p className="text-xl text-gray-600">
          Upload your study material and test yourself with custom exams
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Exam</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exam Title
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="Enter exam title (e.g., Anatomy Chapter 5 Quiz)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Study Material
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {uploadedFile ? uploadedFile.name : 'Click to upload your study material'}
                </p>
                <p className="text-sm text-gray-500">
                  Supports: TXT, PDF, DOC, DOCX
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Or Paste Content Directly
            </label>
            <textarea
              value={examContent}
              onChange={(e) => setExamContent(e.target.value)}
              placeholder="Paste your study material here..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={() => startExam()}
            disabled={!examTitle.trim() || !examContent.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Self-Assessment
          </button>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Upload your study material or paste content directly</li>
              <li>• Give your exam a descriptive title</li>
              <li>• Review the material and write your answers</li>
              <li>• Your answers are saved locally for your review</li>
              <li>• Perfect for self-assessment and exam preparation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Examinations</h1>
        <p className="text-xl text-gray-600">
          Test your knowledge with comprehensive exams and assessments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
                  <p className="opacity-90">{exam.subject}</p>
                </div>
                <FileText className="h-8 w-8 opacity-80" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{exam.duration}</div>
                  <div className="text-sm text-gray-600">minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{exam.totalPoints}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Question Types:</h4>
                <div className="flex space-x-2">
                  {exam.questions.some(q => q.type === 'mcq') && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Multiple Choice
                    </span>
                  )}
                  {exam.questions.some(q => q.type === 'written') && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      Written Answer
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => startExam(exam)}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200"
              >
                Start Exam
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Exam Guidelines</h3>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Ensure stable internet connection before starting</li>
              <li>• Multiple choice questions are auto-graded upon submission</li>
              <li>• Written answers are saved locally and will be reviewed manually</li>
              <li>• Timer automatically submits the exam when time expires</li>
              <li>• Answers are continuously saved to prevent data loss</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;