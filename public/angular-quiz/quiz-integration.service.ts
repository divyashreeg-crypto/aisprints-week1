// Integration helper: Update QuizComponent to save results
// Add this to quiz.component.ts imports and constructor

import { ResultService } from './result.service';
import { QuizService } from './quiz.service';

// In QuizComponent constructor:
// constructor(
//   public quizService: QuizService,
//   private resultService: ResultService  // Add this
// ) {}

// Update finishQuiz() method in quiz.component.ts:
/*
finishQuiz(): void {
  this.quizService.calculateResults();
  
  // Get student name (from sessionStorage or prompt)
  const studentName = sessionStorage.getItem('userEmail')?.split('@')[0] || 
                      prompt('Enter your name:') || 'Anonymous';
  
  // Save result to ResultService
  const quizResults = this.quizService.getQuizResults();
  const questions = this.quizService.questions;
  
  const answers = questions.map((question, index) => {
    const userAnswerIndex = this.quizService.getUserAnswer(index);
    const result = quizResults.find(r => r.questionIndex === index);
    
    return {
      questionIndex: index,
      questionText: question.question,
      userAnswer: userAnswerIndex,
      userAnswerText: question.options[userAnswerIndex],
      correctAnswer: question.correct,
      correctAnswerText: question.options[question.correct],
      isCorrect: result ? result.isCorrect : false
    };
  });
  
  this.resultService.addResult({
    studentName: studentName,
    quizName: 'General Knowledge Quiz',
    score: this.quizService.getScore(),
    totalQuestions: this.quizService.getTotalQuestions(),
    percentage: this.quizService.getPercentage(),
    dateAttempted: new Date(),
    answers: answers
  });
  
  this.showResults = true;
}
*/
