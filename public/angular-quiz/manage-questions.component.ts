import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from './question.service';
import { Question } from './question.model';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  questions: Question[] = [];
  questionForm: FormGroup;
  isEditing: boolean = false;
  editingQuestionId: string | null = null;
  showForm: boolean = false;

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {
    this.questionForm = this.createQuestionForm();
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  // Create reactive form for question
  createQuestionForm(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correct: [0, [Validators.required, Validators.min(0), Validators.max(3)]]
    });
  }

  // Get options FormArray
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // Load all questions
  loadQuestions(): void {
    this.questions = this.questionService.getAllQuestions();
  }

  // Show add question form
  showAddForm(): void {
    this.isEditing = false;
    this.editingQuestionId = null;
    this.showForm = true;
    this.questionForm.reset();
    this.questionForm.patchValue({ correct: 0 });
  }

  // Show edit question form
  showEditForm(question: Question): void {
    this.isEditing = true;
    this.editingQuestionId = question.id;
    this.showForm = true;
    
    // Populate form with question data
    this.questionForm.patchValue({
      question: question.question,
      correct: question.correct
    });

    // Set options
    question.options.forEach((option, index) => {
      this.options.at(index).setValue(option);
    });
  }

  // Cancel form
  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingQuestionId = null;
    this.questionForm.reset();
  }

  // Submit form (Add or Update)
  onSubmit(): void {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      
      const questionData: Question = {
        id: this.editingQuestionId || '',
        question: formValue.question.trim(),
        options: formValue.options.map((opt: string) => opt.trim()),
        correct: formValue.correct
      };

      if (this.isEditing && this.editingQuestionId) {
        // Update existing question
        this.questionService.updateQuestion(this.editingQuestionId, questionData);
      } else {
        // Add new question
        this.questionService.addQuestion(questionData);
      }

      // Reset form and reload questions
      this.cancelForm();
      this.loadQuestions();
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.questionForm);
    }
  }

  // Delete question
  deleteQuestion(id: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id);
      this.loadQuestions();
      
      // If deleting the question being edited, cancel form
      if (this.editingQuestionId === id) {
        this.cancelForm();
      }
    }
  }

  // Mark form group as touched (for validation display)
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          arrayControl.markAsTouched();
        });
      }
    });
  }

  // Check if form field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.questionForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Check if option field is invalid
  isOptionInvalid(index: number): boolean {
    const option = this.options.at(index);
    return !!(option && option.invalid && option.touched);
  }

  // Get validation error message
  getErrorMessage(fieldName: string): string {
    const field = this.questionForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
