import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormTaskComponent } from './component/form-task/form-task.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FindCategoryPipe } from 'src/app/shared/pipes/find-category/find-category.pipe';
import { FilterTaskComponent } from './component/filter-task/filter-task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
];

@NgModule({
  declarations: [TaskComponent, FormTaskComponent, FilterTaskComponent],
  imports: [SharedModule, RouterModule.forChild(routes), FindCategoryPipe],
  providers: [TaskService, CategoryService],
})
export class TaskModule {}
