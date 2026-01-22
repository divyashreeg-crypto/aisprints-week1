import { Injectable } from '@angular/core';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly STORAGE_KEY = 'quizmaker_questions';
  private questions: Question[] = [];

  constructor() {
    this.loadQuestionsFromStorage();
  }

  // Load questions from localStorage
  private loadQuestionsFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.questions = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading questions from storage:', error);
        this.questions = [];
      }
    } else {
      // Initialize with default questions if storage is empty
      this.initializeDefaultQuestions();
    }
  }

  // Save questions to localStorage
  private saveQuestionsToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.questions));
    } catch (error) {
      console.error('Error saving questions to storage:', error);
    }
  }

  // Initialize with default questions
  private initializeDefaultQuestions(): void {
    this.questions = [
      {
        id: this.generateId(),
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
        createdAt: new Date()
      },
      {
        id: this.generateId(),
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        createdAt: new Date()
      },
      {
        id: this.generateId(),
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        createdAt: new Date()
      }
    ];
    this.saveQuestionsToStorage();
  }

  // Generate unique ID
  private generateId(): string {
    return 'q' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  // Get all questions
  getAllQuestions(): Question[] {
    return [...this.questions]; // Return copy to prevent direct mutation
  }

  // Get question by ID
  getQuestionById(id: string): Question | undefined {
    return this.questions.find(q => q.id === id);
  }

  // Add new question
  addQuestion(question: Question): void {
    question.id = this.generateId();
    question.createdAt = new Date();
    question.updatedAt = new Date();
    this.questions.push(question);
    this.saveQuestionsToStorage();
  }

  // Update existing question
  updateQuestion(id: string, updatedQuestion: Partial<Question>): boolean {
    const index = this.questions.findIndex(q => q.id === id);
    if (index !== -1) {
      this.questions[index] = {
        ...this.questions[index],
        ...updatedQuestion,
        updatedAt: new Date()
      };
      this.saveQuestionsToStorage();
      return true;
    }
    return false;
  }

  // Delete question
  deleteQuestion(id: string): boolean {
    const index = this.questions.findIndex(q => q.id === id);
    if (index !== -1) {
      this.questions.splice(index, 1);
      this.saveQuestionsToStorage();
      return true;
    }
    return false;
  }

  // Get total count of questions
  getQuestionCount(): number {
    return this.questions.length;
  }

  // Clear all questions (useful for testing)
  clearAllQuestions(): void {
    this.questions = [];
    this.saveQuestionsToStorage();
  }
}
