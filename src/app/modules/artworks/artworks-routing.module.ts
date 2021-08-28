import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworksComponent } from './pages/artworks/artworks.component';

const routes: Routes = [
  {
    path: '',
    component: ArtworksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworksRoutingModule { }
