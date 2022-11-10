import { Injectable } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Artwork } from 'src/app/shared/models/artwork.model';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  artworks: Array<Artwork> = new Array<Artwork>();
  constructor(
    private http: HttpService
  ) { }

  getArtworksByDepartment() {
    return this.http.get(environment.baseUrl + "search?departmentId=11&q=sunflowers").pipe(
      mergeMap(res =>
        from(res.objectIDs).pipe(
          mergeMap(objectID => this.http.get(environment.baseUrl + "objects/" + objectID).pipe(
            map(artwork => {
              this.getImageColour(artwork);
              return this.artworks;
            })
          ))
        )
      )
    )
  }


  getImageColour(artwork: any) {
    let rgb = [];
    let palette = [];
    let paletteColours = [];
    const tempArtworks = new Array<Artwork>();
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener('load', () => {

    })

    let imageURL = artwork.primaryImageSmall;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imageURL);
    waitForImageToLoad(img).then(() => {
      rgb = colorThief.getColor(img);
      palette = colorThief.getPalette(img, 5);
      if(rgb && rgb.length > 0 && palette && palette.length > 0) {
        let color = "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
        palette.forEach(x => {
          let pColour = "#" + ((1 << 24) + (x[0] << 16) + (x[1] << 8) + x[2]).toString(16).slice(1);
          paletteColours.push(pColour);
        });
        let artworkObject = new Artwork(artwork.objectID, artwork.primaryImageSmall, color, paletteColours);
        this.artworks.push(artworkObject);
      }
    });
}

}


function waitForImageToLoad(imageElement) {
  return new Promise(resolve => {
    imageElement.onload = resolve;
  })
}
//wowkaw

