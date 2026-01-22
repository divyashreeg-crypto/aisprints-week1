import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResultService } from './result.service';
import { QuizResult, QuestionAnswer } from './result.model';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  results: QuizResult[] = [];
  selectedResult: QuizResult | null = null;
  showDetails: boolean = false;
  searchTerm: string = '';
  filterBy: 'all' | 'student' | 'quiz' = 'all';

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  // Load all results
  loadResults(): void {
    this.results = this.resultService.getAllResults();
  }

  // Format date for display
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // View details of a specific result
  viewDetails(result: QuizResult): void {
    this.selectedResult = result;
    this.showDetails = true;
  }

  // Close details view
  closeDetails(): void {
    this.showDetails = false;
    this.selectedResult = null;
  }

  // Delete result
  deleteResult(id: string): void {
    if (confirm('Are you sure you want to delete this result?')) {
      this.resultService.deleteResult(id);
      this.loadResults();
      
      // Close details if deleting the selected result
      if (this.selectedResult?.id === id) {
        this.closeDetails();
      }
    }
  }

  // Filter results based on search term
  getFilteredResults(): QuizResult[] {
    if (!this.searchTerm.trim()) {
      return this.results;
    }

    const term = this.searchTerm.toLowerCase();
    
    switch (this.filterBy) {
      case 'student':
        return this.results.filter(r => 
          r.studentName.toLowerCase().includes(term)
        );
      case 'quiz':
        return this.results.filter(r => 
          r.quizName.toLowerCase().includes(term)
        );
      default:
        return this.results.filter(r => 
          r.studentName.toLowerCase().includes(term) ||
          r.quizName.toLowerCase().includes(term)
        );
    }
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm = '';
  }

  // Get answer class for styling
  getAnswerClass(answer: QuestionAnswer): string {
    return answer.isCorrect ? 'correct' : 'incorrect';
  }

  // Get option letter (A, B, C, D)
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D
  }
}
