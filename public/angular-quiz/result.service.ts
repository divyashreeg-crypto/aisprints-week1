import { Injectable } from '@angular/core';
import { QuizResult, QuestionAnswer } from './result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly STORAGE_KEY = 'quizmaker_results';
  private results: QuizResult[] = [];

  constructor() {
    this.loadResultsFromStorage();
    // Initialize with sample data if storage is empty
    if (this.results.length === 0) {
      this.initializeSampleData();
    }
  }

  // Load results from localStorage
  private loadResultsFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        this.results = parsed.map((result: any) => ({
          ...result,
          dateAttempted: new Date(result.dateAttempted)
        }));
      } catch (error) {
        console.error('Error loading results from storage:', error);
        this.results = [];
      }
    }
  }

  // Save results to localStorage
  private saveResultsToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.results));
    } catch (error) {
      console.error('Error saving results to storage:', error);
    }
  }

  // Initialize with sample data
  private initializeSampleData(): void {
    this.results = [
      {
        id: this.generateId(),
        studentName: 'John Doe',
        quizName: 'General Knowledge Quiz',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        dateAttempted: new Date('2024-01-15T10:30:00'),
        answers: this.generateSampleAnswers(8, 10)
      },
      {
        id: this.generateId(),
        studentName: 'Jane Smith',
        quizName: 'General Knowledge Quiz',
        score: 7,
        totalQuestions: 10,
        percentage: 70,
        dateAttempted: new Date('2024-01-16T14:20:00'),
        answers: this.generateSampleAnswers(7, 10)
      },
      {
        id: this.generateId(),
        studentName: 'Mike Johnson',
        quizName: 'General Knowledge Quiz',
        score: 9,
        totalQuestions: 10,
        percentage: 90,
        dateAttempted: new Date('2024-01-17T09:15:00'),
        answers: this.generateSampleAnswers(9, 10)
      },
      {
        id: this.generateId(),
        studentName: 'Sarah Williams',
        quizName: 'General Knowledge Quiz',
        score: 6,
        totalQuestions: 10,
        percentage: 60,
        dateAttempted: new Date('2024-01-18T16:45:00'),
        answers: this.generateSampleAnswers(6, 10)
      }
    ];
    this.saveResultsToStorage();
  }

  // Generate sample answers for demo
  private generateSampleAnswers(correctCount: number, total: number): QuestionAnswer[] {
    const questions = [
      { text: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
      { text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
      { text: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
      { text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
      { text: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
      { text: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], correct: 0 },
      { text: "Which programming language is known as the 'language of the web'?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2 },
      { text: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
      { text: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Elephant", "Bear"], correct: 1 },
      { text: "What year did World War II end?", options: ["1943", "1944", "1945", "1946"], correct: 2 }
    ];

    return questions.slice(0, total).map((q, index) => {
      const isCorrect = index < correctCount;
      const userAnswer = isCorrect ? q.correct : (q.correct + 1) % 4; // Wrong answer if not correct
      
      return {
        questionIndex: index,
        questionText: q.text,
        userAnswer: userAnswer,
        userAnswerText: q.options[userAnswer],
        correctAnswer: q.correct,
        correctAnswerText: q.options[q.correct],
        isCorrect: isCorrect
      };
    });
  }

  // Generate unique ID
  private generateId(): string {
    return 'r' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  // Get all results
  getAllResults(): QuizResult[] {
    return [...this.results].sort((a, b) => 
      b.dateAttempted.getTime() - a.dateAttempted.getTime() // Sort by date (newest first)
    );
  }

  // Get result by ID
  getResultById(id: string): QuizResult | undefined {
    return this.results.find(r => r.id === id);
  }

  // Add new result (called when quiz is submitted)
  addResult(result: Omit<QuizResult, 'id'>): string {
    const newResult: QuizResult = {
      ...result,
      id: this.generateId(),
      dateAttempted: new Date()
    };
    this.results.push(newResult);
    this.saveResultsToStorage();
    return newResult.id;
  }

  // Delete result
  deleteResult(id: string): boolean {
    const index = this.results.findIndex(r => r.id === id);
    if (index !== -1) {
      this.results.splice(index, 1);
      this.saveResultsToStorage();
      return true;
    }
    return false;
  }

  // Get results by student name
  getResultsByStudent(studentName: string): QuizResult[] {
    return this.results.filter(r => 
      r.studentName.toLowerCase().includes(studentName.toLowerCase())
    );
  }

  // Get results by quiz name
  getResultsByQuiz(quizName: string): QuizResult[] {
    return this.results.filter(r => 
      r.quizName.toLowerCase().includes(quizName.toLowerCase())
    );
  }

  // Get total results count
  getTotalResultsCount(): number {
    return this.results.length;
  }
}
