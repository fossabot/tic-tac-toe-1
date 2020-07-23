import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ContentLayoutComponent } from '../../layout/content/content.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Homepage',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
