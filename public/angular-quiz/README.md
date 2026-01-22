# Angular Quiz Application

This is a standalone Angular quiz application with detailed results view.

## Files Structure

- `quiz.service.ts` - Service to manage quiz data and state
- `quiz.component.ts` - Main quiz component
- `quiz.component.html` - Quiz template
- `quiz.component.css` - Quiz styles
- `results.component.ts` - Results component
- `results.component.html` - Results template
- `results.component.css` - Results styles
- `app.component.ts` - Root component
- `main.ts` - Application bootstrap
- `index.html` - HTML entry point

## How Results Data Flows

1. **During Quiz:**
   - User selects answers → `selectOption()` in `QuizComponent`
   - Answers stored in `QuizService.userAnswers[]` array
   - Each answer saved with `quizService.saveAnswer(questionIndex, answerIndex)`

2. **When Quiz Completes:**
   - `finishQuiz()` called in `QuizComponent`
   - `quizService.calculateResults()` processes all answers
   - Creates `QuizResult[]` array with question index, user answer, and correctness

3. **Results Display:**
   - `ResultsComponent` receives `QuizService` as input
   - Uses service methods to get:
     - Score: `getScore()`
     - Percentage: `getPercentage()`
     - All results: `getQuizResults()`
     - Question details: `getQuestion(index)`
   - Displays detailed breakdown using Angular data binding

## Key Angular Features Used

- **Standalone Components** - No NgModules needed
- **Service Injection** - `QuizService` manages state
- **Data Binding** - `*ngFor`, `*ngIf`, property binding
- **Event Binding** - `(click)`, `(restart)`
- **Component Communication** - `@Input`, `@Output`

## Usage

For production, use Angular CLI:
```bash
ng new quiz-app
ng generate component quiz
ng generate component results
ng generate service quiz
```

This standalone version is simplified for Week 1 assessment level.
