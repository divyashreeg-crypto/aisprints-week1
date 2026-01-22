import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizService, QuizResult } from './quiz.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() quizService!: QuizService;
  @Output() restart = new EventEmitter<void>();

  // Get score data
  getScore(): number {
    return this.quizService.getScore();
  }

  getTotalQuestions(): number {
    return this.quizService.getTotalQuestions();
  }

  getPercentage(): number {
    return this.quizService.getPercentage();
  }

  getScoreMessage(): string {
    const percentage = this.getPercentage();
    if (percentage >= 90) {
      return "Outstanding! You're a quiz master!";
    } else if (percentage >= 70) {
      return "Great job! Well done!";
    } else if (percentage >= 50) {
      return "Good effort! Keep practicing!";
    } else {
      return "Nice try! Review and try again!";
    }
  }

  // Get all quiz results
  getQuizResults(): QuizResult[] {
    return this.quizService.getQuizResults();
  }

  // Get question details
  getQuestion(index: number) {
    return this.quizService.getQuestion(index);
  }

  // Get user's answer text
  getUserAnswerText(questionIndex: number): string {
    const question = this.getQuestion(questionIndex);
    const userAnswerIndex = this.quizService.getUserAnswer(questionIndex);
    return question.options[userAnswerIndex];
  }

  // Get correct answer text
  getCorrectAnswerText(questionIndex: number): string {
    const question = this.getQuestion(questionIndex);
    return question.options[question.correct];
  }

  // Check if answer is correct
  isAnswerCorrect(questionIndex: number): boolean {
    const result = this.quizService.getQuizResults().find(r => r.questionIndex === questionIndex);
    return result ? result.isCorrect : false;
  }

  // Get incorrect count
  getIncorrectCount(): number {
    return this.getTotalQuestions() - this.getScore();
  }

  // Restart quiz
  onRestart(): void {
    this.restart.emit();
  }
}
