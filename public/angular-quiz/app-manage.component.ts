import { Component } from '@angular/core';
import { ManageQuestionsComponent } from './manage-questions.component';

@Component({
  selector: 'app-manage-root',
  standalone: true,
  imports: [ManageQuestionsComponent],
  template: `
    <div class="app-container">
      <app-manage-questions></app-manage-questions>
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
export class AppManageComponent {
  title = 'QuizMaker - Manage Questions';
}
