
function waitForImageToLoad(imageElement) {
    return new Promise(resolve => {
      imageElement.onload = resolve;
    })
  }

  //test
  console.log('service ');
  //dasdasd