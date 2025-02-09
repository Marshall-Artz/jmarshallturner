import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutContainerComponent } from './components/about-container/about-container.component';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full'},
  {path: 'about', component: AboutContainerComponent},
  // {path: 'projects', component: ProjectsContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
