const searchBar = document.getElementById("searchBar"); // Main Search Bar
const searchButton = document.getElementById("searchSubmit"); // Magnifying Glass - Search
const gallerySection = document.getElementById("gallerySection"); // Gallery Section 

const tombStone = (gallery) => {
    for (const artPiece of gallery) {
      if (artPiece.artist_display.length) {
        const wallSpace = document.createElement("div");
        wallSpace.className = "wallSpace";
        //const image = document.createElement("img");
        //image.src = artPiece.;
        const title = document.createElement("h2");
        title.textContent = artPiece.title;
        title.className = "artworkTitle";
        const creationDate = document.createElement("h2");
        creationDate.textContent = `, ${artPiece.date_display}`;
        creationDate.className = "creationDate";
        const artistInfo = document.createElement("h3");
        artistInfo.innerHTML = artPiece.artist_display;
        artistInfo.className = "artistInfo";
        const medium = document.createElement("h4");
        medium.textContent = artPiece.medium_display;
        medium.className = "medium";
        const creditLine = document.createElement("h5");
        creditLine.textContent = artPiece.creditline;
        creditLine.className = "creditLine";
        const accessionNumber = document.createElement("h6");
        accessionNumber.textContent = artPiece.main_reference_number;
        accessionNumber.className = "accessionNumber";
        //wallSpace.appendChild(image);
        wallSpace.appendChild(title);
        wallSpace.appendChild(creationDate);
        wallSpace.appendChild(artistInfo);
        wallSpace.appendChild(medium);
        wallSpace.appendChild(creditLine);
        wallSpace.appendChild(accessionNumber);
        gallerySection.appendChild(wallSpace);
      };
    };
  };

// Function & Fetch Gallery Wall 

const galleryWall = () => {
    const galleryURL = `https://api.artic.edu/api/v1/artworks/search?=painting&fields=id,title,artist_display,date_display,medium_display,credit_line,main_reference_number,image_id&limit=100`;

    fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
        tombStone(gallery.data)
    });
};

galleryWall();


const art = () => { 
    const searchParam = searchBar.value;  // Parameter for the Artist in the API URL
    const artAPI = `https://api.artic.edu/api/v1/artworks/search?q=${searchParam}&fields=id,title,artist_display,date_display,medium_display,credit_line,main_reference_number,image_id&limit=100`
    fetch(artAPI)
      .then((response) => response.json())
      .then((artistArt) => {
        searchBar.value = "";
        gallerySection.innerHTML = "";
        tombStone(artistArt.data);
      });
  };

  // Rough Draft of Function(?)to Pull Image
  // https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg
  // API is pulling the image_id which is the "identifier" needed.
  // The code is going to involve something similar to line 58: const searchParam = searchBar.value;  // Parameter for the Artist in the API URL
  // The function needs to extract(?) the image ID, integrate it to the URL, and then pull the image at that location.
  // The image needs to be placed in the line 11 and appended on line 30. 


//Even Listeners
searchButton.addEventListener("click", art); // Magnifying Glass - Search 

searchBar.addEventListener("keyup", (e) => {  // Clearing / Reseting the Search Bar
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});