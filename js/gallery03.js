const searchBar = document.getElementById("searchBar"); // Main Search Bar
const searchButton = document.getElementById("searchSubmit"); // Magnifying Glass - Search
const gallerySection = document.getElementById("gallerySection"); // Gallery Section 

const tombStone = (gallery) => {
    for (const artPiece of gallery) {
        if (artPiece.title.length) {
            const wallSpace = document.createElement("div");
            wallSpace.className = "wallSpace";
            const image = document.createElement("img");
            image.src = artPiece.webImage.url;
            const title = document.createElement("h1");
            title.textContent = artPiece.title;
            title.className = "artworkTitle"
            const creationDate = document.createElement("h2")
            creationDate.textContent = artPiece.longTitle;
            creationDate.className = "creationDate";
            const artist = document.createElement("h2");
            artist.textContent = artPiece.principalOrFirstMaker;
            artist.className = "artist";
            wallSpace.appendChild(image);
            wallSpace.appendChild(title);
            wallSpace.appendChild(creationDate);
            wallSpace.appendChild(artist);
            gallerySection.appendChild(wallSpace);
        };
    };

};

// Function & Fetch with a limit of 50 pieces 
const galleryWall = () => {
    const galleryURL = `https://www.rijksmuseum.nl/api/en/collection?key=KIfNKQsl&imgonly=True&toppieces=True&type=painting&culture=en&ps=50`;

    fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
      tombStone(gallery.artObjects);
    });
};

galleryWall();

//Function & Fetch for when you Search 
const art = () => {
    const searchParam = searchBar.value; 
    const artAPI = `https://www.rijksmuseum.nl/api/en/collection?key=KIfNKQsl&imgonly=True&type=painting&culture=en&ps=50&q=${searchParam}`;
    
    fetch(artAPI)
    .then((response) => response.json())
    .then((art) => {
      searchBar.value = "";
      gallerySection.innerHTML = "";
      tombStone(art.artObjects);
    });

};

//Even Listeners
searchButton.addEventListener("click", art); // Magnifying Glass - Search 

searchBar.addEventListener("keyup", (e) => {  // Clearing / Reseting the Search Bar
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});
