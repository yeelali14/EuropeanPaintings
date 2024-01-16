import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artworks',
    loadChildren: () => import('./modules/artworks/artworks.module').then(m => m.ArtworksModule)
  },
  { path: '**', redirectTo: '/artworks'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
