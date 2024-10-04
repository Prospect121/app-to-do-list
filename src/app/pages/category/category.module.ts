import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [
    CategoryComponent,
    FilterCategoryComponent,
    FormCategoryComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [CategoryService],
})
export class CategoryModule {}
