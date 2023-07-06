import { Injectable } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Artwork } from 'src/app/shared/models/artwork.model';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import ColorThief from 'colorthief';
//ok
@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  artworks: Array<Artwork> = new Array<Artwork>();
  constructor(private http: HttpService) {}

  getArtworksByDepartment() {
    return this.http
      .get(environment.baseUrl + 'search?departmentId=11&q=sunflowers')
      .pipe(
        mergeMap((res) =>
          from(res.objectIDs).pipe(
            mergeMap((objectID) =>
              this.http.get(environment.baseUrl + 'objects/' + objectID).pipe(
                map((artwork) => {
                  this.getImageColour(artwork);
                  return this.artworks;
                })
              )
            )
          )
        )
      );
  }

  getImageColour(artwork: any) {
    let rgb = [];
    let palette = [];
    let paletteColours = [];
    const tempArtworks = new Array<Artwork>();
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener('load', () => {});

    let imageURL = artwork.primaryImageSmall;
    let googleProxyURL =
      'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imageURL);
    waitForImageToLoad(img).then(() => {
      rgb = colorThief.getColor(img);
      palette = colorThief.getPalette(img, 5);
      if (rgb && rgb.length > 0 && palette && palette.length > 0) {
        let color =
          '#' +
          ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
            .toString(16)
            .slice(1);
        palette.forEach((x) => {
          let pColour =
            '#' +
            ((1 << 24) + (x[0] << 16) + (x[1] << 8) + x[2])
              .toString(16)
              .slice(1);
          paletteColours.push(pColour);
        });
        let artworkObject = new Artwork(
          artwork.objectID,
          artwork.primaryImageSmall,
          color,
          paletteColours
        );
        this.artworks.push(artworkObject);
      }
    });
  }
}

function waitForImageToLoad(imageElement) {
  return new Promise((resolve) => {
    imageElement.onload = resolve;
  });
}

const error = {
  timestamp: '2023-07-06T09:16:24.938Z',
  level: 'info',
  message:
    'Failed creating workflow dispatch for yeelali14/pasha with ref: main failed: Unexpected inputs provided: ["repo", "pr_id", "trigger_if_gitstream"]',
  ctx: {
    environment: 'local',
    app: 'github-actions-consumer',
    name: 'HttpError',
    status: 422,
    response: {
      url: 'https://api.github.com/repos/yeelali14/pasha/actions/workflows/.github%2Fworkflows%2Fexample.yml/dispatches',
      status: 422,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-expose-headers':
          'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',
        connection: 'close',
        'content-length': '191',
        'content-security-policy': "default-src 'none'",
        'content-type': 'application/json; charset=utf-8',
        date: 'Thu, 06 Jul 2023 09:16:24 GMT',
        'referrer-policy':
          'origin-when-cross-origin, strict-origin-when-cross-origin',
        server: 'GitHub.com',
        'strict-transport-security':
          'max-age=31536000; includeSubdomains; preload',
        vary: 'Accept-Encoding, Accept, X-Requested-With',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'deny',
        'x-github-api-version-selected': '2022-11-28',
        'x-github-media-type': 'github.v3; format=json',
        'x-github-request-id': 'CD0B:DA6F:1498D94:14CCA1E:64A68668',
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4917',
        'x-ratelimit-reset': '1688637691',
        'x-ratelimit-resource': 'core',
        'x-ratelimit-used': '83',
        'x-xss-protection': '0',
      },
      data: {
        message:
          'Unexpected inputs provided: ["repo", "pr_id", "trigger_if_gitstream"]',
        documentation_url:
          'https://docs.github.com/rest/reference/actions#create-a-workflow-dispatch-event',
      },
    },
    request: {
      method: 'POST',
      url: 'https://api.github.com/repos/yeelali14/pasha/actions/workflows/.github%2Fworkflows%2Fexample.yml/dispatches',
      headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent':
          'octokit.js/2.0.7 octokit-core.js/4.2.1 Node.js/16.20.1 (linux; arm64)',
        authorization: 'tok*****',
        'content-type': 'application/json; charset=utf-8',
      },
      body: '{"ref":"main","inputs":{"repo":"yeelali14/EuropeanPaintings","pr_id":"856","trigger_if_gitstream":"true"}}',
      request: {},
    },
  },
};

console.log('error', error);
