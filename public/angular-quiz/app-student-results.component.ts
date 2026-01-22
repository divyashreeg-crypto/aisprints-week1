import { Component } from '@angular/core';
import { StudentResultsComponent } from './student-results.component';

@Component({
  selector: 'app-student-results-root',
  standalone: true,
  imports: [StudentResultsComponent],
  template: `
    <div class="app-container">
      <app-student-results></app-student-results>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
  `]
})
export class AppStudentResultsComponent {
  title = 'QuizMaker - Student Results';
}
