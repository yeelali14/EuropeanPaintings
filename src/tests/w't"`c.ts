
function waitForImageToLoad(imageElement) {
    console.log('service ');
    return new Promise(resolve => {
      imageElement.onload = resolve;
    })
  }

  console.log('service ');
  console.log('service ');
  ///D/SADA