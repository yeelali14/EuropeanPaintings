import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworksRoutingModule } from './artworks-routing.module';
import { ArtworksComponent } from './pages/artworks/artworks.component';


@NgModule({
  declarations: [
    ArtworksComponent
  ],
  imports: [
    CommonModule,
    ArtworksRoutingModule
  ]
})
export class ArtworksModule { }
