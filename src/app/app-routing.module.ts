import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/newsList', pathMatch: 'full' },
  { path: 'newsList', component: NewsListComponent },
  { path: 'newsList/:page', component: NewsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
