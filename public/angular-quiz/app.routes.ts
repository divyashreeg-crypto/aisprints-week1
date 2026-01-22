import { Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { StudentResultsComponent } from './student-results.component';
import { ManageQuestionsComponent } from './manage-questions.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'student-results',
    component: StudentResultsComponent
  },
  {
    path: 'manage-questions',
    component: ManageQuestionsComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
