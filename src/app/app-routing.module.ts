import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutContainerComponent } from './components/about-container/about-container.component';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'About', pathMatch: 'full'},
  {path: 'About', component: AboutContainerComponent},
  {path: 'Projects', component: ProjectsContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
