import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {ProjectsComponent} from "./projects/projects.component"

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProjectsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
