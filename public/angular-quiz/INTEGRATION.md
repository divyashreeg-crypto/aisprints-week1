# ManageQuestions Component - Integration Guide

## Files Created

1. **question.model.ts** - Question interface/model
2. **question.service.ts** - Service for CRUD operations
3. **manage-questions.component.ts** - Component logic
4. **manage-questions.component.html** - Template
5. **manage-questions.component.css** - Styles

## Question Model Structure

```typescript
interface Question {
  id: string;              // Unique identifier
  question: string;        // Question text
  options: string[];       // Array of 4 options
  correct: number;         // Index of correct answer (0-based)
  createdAt?: Date;       // Optional timestamp
  updatedAt?: Date;       // Optional timestamp
}
```

## QuestionService Methods

- `getAllQuestions()` - Get all questions
- `getQuestionById(id)` - Get question by ID
- `addQuestion(question)` - Add new question
- `updateQuestion(id, question)` - Update existing question
- `deleteQuestion(id)` - Delete question
- `getQuestionCount()` - Get total count

## Features

### ✅ Add Question
- Click "Add Question" button
- Fill in question text and 4 options
- Click "✓ Correct" button to mark correct answer
- Submit form

### ✅ Edit Question
- Click "Edit" button on any question card
- Form pre-populates with question data
- Modify and submit

### ✅ Delete Question
- Click "Delete" button on question card
- Confirm deletion

### ✅ Validation
- Question text required (min 5 characters)
- All 4 options required
- Correct answer must be selected (0-3)

### ✅ Data Persistence
- Questions stored in localStorage
- Automatically loads on component init
- Initializes with 3 default questions if empty

## Usage Example

```typescript
// In your app component
import { ManageQuestionsComponent } from './manage-questions.component';

@Component({
  imports: [ManageQuestionsComponent],
  template: '<app-manage-questions></app-manage-questions>'
})
```

## Integration with Quiz Service

To use managed questions in your quiz:

```typescript
// Update quiz.service.ts to use QuestionService
import { QuestionService } from './question.service';

constructor(private questionService: QuestionService) {
  // Load questions from QuestionService instead of hardcoded
  this.questions = this.questionService.getAllQuestions();
}
```

## Standalone Component

This component is standalone and doesn't require NgModules. Just import it where needed:

```typescript
imports: [ManageQuestionsComponent]
```
