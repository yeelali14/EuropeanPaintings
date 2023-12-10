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

const se = [
  {
    id: '73c0569ec6fae7e96205f9d6aeede59f7f0a3761',
    tree_id: '6aad7e498ac8a299c9f05fd23589a73953afbede',
    distinct: true,
    message: 'k',
    timestamp: '2023-10-04T00:47:05+03:00',
    url: 'https://github.com/yeelali14/EuropeanPaintings/commit/73c0569ec6fae7e96205f9d6aeede59f7f0a3761',
    author: { name: 'Yeela Lifshitz', email: 'yeelalifshitz@Yeela-MacBook-Pro.local' },
    committer: { name: 'Yeela Lifshitz', email: 'yeelalifshitz@Yeela-MacBook-Pro.local' },
    added: ['.cm/conflicts.cm'],
    removed: ['.cm/banana1.cm'],
    modified: []
  }
];

