
function waitForImageToLoad(imageElement) {
    return new Promise(resolve => {
      imageElement.onload = resolve;
    })
  }

  console.log('service ');
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
  //dsadas