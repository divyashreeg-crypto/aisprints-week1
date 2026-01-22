import { Injectable } from '@angular/core';

export interface Question {
  question: string;
  options: string[];
  correct: number; // Index of correct answer (0-based)
}

export interface QuizResult {
  questionIndex: number;
  userAnswer: number;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Quiz Questions Data (10 MCQs)
  questions: Question[] = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correct: 0
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Elephant", "Bear"],
      correct: 1
    },
    {
      question: "What year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2
    }
  ];

  // Store user answers during quiz
  userAnswers: number[] = [];
  quizResults: QuizResult[] = [];

  constructor() {
    this.resetQuiz();
  }

  // Reset quiz state
  resetQuiz(): void {
    this.userAnswers = [];
    this.quizResults = [];
  }

  // Get total number of questions
  getTotalQuestions(): number {
    return this.questions.length;
  }

  // Get question by index
  getQuestion(index: number): Question {
    return this.questions[index];
  }

  // Save user's answer for current question
  saveAnswer(questionIndex: number, answerIndex: number): void {
    this.userAnswers[questionIndex] = answerIndex;
  }

  // Calculate and store quiz results
  calculateResults(): void {
    this.quizResults = this.questions.map((question, index) => {
      const userAnswer = this.userAnswers[index];
      return {
        questionIndex: index,
        userAnswer: userAnswer,
        isCorrect: userAnswer === question.correct
      };
    });
  }

  // Get score (number of correct answers)
  getScore(): number {
    return this.quizResults.filter(result => result.isCorrect).length;
  }

  // Get percentage score
  getPercentage(): number {
    if (this.quizResults.length === 0) return 0;
    return Math.round((this.getScore() / this.questions.length) * 100);
  }

  // Get all quiz results
  getQuizResults(): QuizResult[] {
    return this.quizResults;
  }

  // Get user's answer for a question
  getUserAnswer(questionIndex: number): number {
    return this.userAnswers[questionIndex];
  }
}
