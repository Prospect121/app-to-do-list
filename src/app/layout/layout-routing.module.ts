import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
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
          import('../pages/category/category.module').then(
            m => m.CategoryModule
          ),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('../pages/task/task.module').then(m => m.TaskModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
