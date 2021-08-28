import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtworksService } from 'src/app/core/services/artworks.service';
import { Artwork } from 'src/app/shared/models/artwork.model';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
  artworksSubscription: Subscription;
  artworks: Array<Artwork> = new Array<Artwork>();
  
  constructor(
    private artworkService: ArtworksService
  ) { }

  ngOnInit(): void {
    this.artworksSubscription = this.artworkService.getArtworksByDepartment().subscribe(res => {
      if(res.length > 0) {
        this.artworks = res;
      }
    })
  }

}
