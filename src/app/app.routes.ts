import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'task',
        pathMatch: 'full',
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            m => m.CategoryModule
          ),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./pages/task/task.module').then(m => m.TaskModule),
      },
    ],
  },
];
