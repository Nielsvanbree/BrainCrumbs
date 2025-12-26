import { useState } from 'react';
import { ChevronRight, CheckCircle, X, AlertCircle, Check } from 'lucide-react';
import { Lesson } from '@/lib/course-data';

interface QuizRunnerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNextLesson: () => void;
}

export default function QuizRunner({ lesson, onComplete, onNextLesson }: QuizRunnerProps) {
  const questions = lesson.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="bg-bc-card border border-white/10 rounded-2xl overflow-hidden min-h-[400px] mb-8">
        <div className="p-12 text-center text-gray-400">No questions available.</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

  const handleCheck = () => {
    setIsAnswerChecked(true);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
      onComplete();
    }
  };

  if (quizFinished) {
    return (
      <div className="bg-bc-card border border-white/10 rounded-2xl overflow-hidden min-h-[400px] mb-8">
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-24 h-24 bg-bc-purple/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-bc-purple">{Math.round((score / questions.length) * 100)}%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">
            Quiz Completed!
          </h3>
          <p className="text-gray-400 mb-8">
            You scored {score} out of {questions.length} correctly.
          </p>
          <button 
            onClick={onNextLesson}
            className="px-8 py-3 bg-bc-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Continue to Next Lesson <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bc-card border border-white/10 rounded-2xl overflow-hidden min-h-[400px] mb-8">
      <div className="p-6 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-bc-purple uppercase tracking-wider">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            Current Score: {score}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-8">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, idx) => {
            let buttonStyle = "border-white/10 hover:bg-white/5";
            
            if (isAnswerChecked) {
              if (idx === currentQuestion.correctAnswerIndex) {
                buttonStyle = "border-bc-green bg-bc-green/10 text-white";
              } else if (idx === selectedOption) {
                buttonStyle = "border-red-500 bg-red-500/10 text-white";
              } else {
                buttonStyle = "opacity-50 border-white/10";
              }
            } else {
              if (idx === selectedOption) {
                buttonStyle = "border-bc-blue bg-bc-blue/10 text-white";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !isAnswerChecked && setSelectedOption(idx)}
                disabled={isAnswerChecked}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${buttonStyle}`}
              >
                <span>{option}</span>
                {isAnswerChecked && idx === currentQuestion.correctAnswerIndex && <CheckCircle className="text-bc-green" size={20} />}
                {isAnswerChecked && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <X className="text-red-500" size={20} />}
              </button>
            );
          })}
        </div>

        {isAnswerChecked && (
          <div className={`p-6 rounded-xl mb-8 ${
            isCorrect 
              ? 'bg-bc-green/10 border border-bc-green/30' 
              : 'bg-red-500/10 border border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Check className="text-bc-green mt-1" size={20}/>
              ) : (
                <AlertCircle className="text-red-500 mt-1" size={20}/>
              )}
              <div>
                <h4 className={`font-bold mb-1 ${
                  isCorrect ? 'text-bc-green' : 'text-red-500'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <button 
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-bc-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}