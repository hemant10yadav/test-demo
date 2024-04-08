import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationFormComponent } from './location-form/location-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LocationFormComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
