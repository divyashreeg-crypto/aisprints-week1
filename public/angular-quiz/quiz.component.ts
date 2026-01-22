import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizService, Question } from './quiz.service';
import { ResultsComponent } from './results.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule, ResultsComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  showResults: boolean = false;
  currentQuestion: Question | null = null;
  progress: number = 0;

  constructor(public quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  // Load current question
  loadQuestion(): void {
    this.currentQuestion = this.quizService.getQuestion(this.currentQuestionIndex);
    this.selectedAnswer = this.quizService.getUserAnswer(this.currentQuestionIndex);
    this.updateProgress();
  }

  // Update progress bar
  updateProgress(): void {
    this.progress = ((this.currentQuestionIndex + 1) / this.quizService.getTotalQuestions()) * 100;
  }

  // Handle option selection
  selectOption(index: number): void {
    this.selectedAnswer = index;
    this.quizService.saveAnswer(this.currentQuestionIndex, index);
  }

  // Move to next question
  nextQuestion(): void {
    if (this.selectedAnswer === null) {
      return; // Should not happen, but safety check
    }

    // Save answer
    this.quizService.saveAnswer(this.currentQuestionIndex, this.selectedAnswer);

    // Move to next question or show results
    this.currentQuestionIndex++;
    
    if (this.currentQuestionIndex < this.quizService.getTotalQuestions()) {
      this.loadQuestion();
    } else {
      this.finishQuiz();
    }
  }

  // Finish quiz and show results
  finishQuiz(): void {
    this.quizService.calculateResults();
    this.showResults = true;
  }

  // Restart quiz
  restartQuiz(): void {
    this.quizService.resetQuiz();
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.showResults = false;
    this.loadQuestion();
  }
}
