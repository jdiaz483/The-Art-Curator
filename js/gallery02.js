const searchBar = document.getElementById("searchBar"); // Main Search Bar
const searchButton = document.getElementById("searchSubmit"); // Magnifying Glass - Search
const gallerySection = document.getElementById("gallerySection"); // Gallery Section 

const tombStone = (gallery) => {
  for (const artPiece of gallery) {
    if (artPiece.creators.length) {
      const wallSpace = document.createElement("div");
      wallSpace.className = "wallSpace";
      const image = document.createElement("img");
      image.src = artPiece.images.web.url;
      const title = document.createElement("h2");
      title.textContent = artPiece.title;
      title.className = "artworkTitle";
      const creationDate = document.createElement("h2");
      creationDate.textContent = `, ${artPiece.creation_date}`;
      creationDate.className = "creationDate";
      const artistInfo = document.createElement("h3");
      artistInfo.innerHTML = artPiece.creators[0].description;
      artistInfo.className = "artistInfo";
      const medium = document.createElement("h4");
      medium.textContent = artPiece.technique;
      medium.className = "technique";
      const creditLine = document.createElement("h5");
      creditLine.textContent = artPiece.creditline;
      creditLine.className = "creditLine";
      const accessionNumber = document.createElement("h6");
      accessionNumber.textContent = artPiece.accession_number;
      accessionNumber.className = "accessionNumber";
      wallSpace.appendChild(image);
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

// Function & Fetch with a limit of 50 pieces
const galleryWall = () => {
  const galleryURL = `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=100`;

  fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
      tombStone(gallery.data);
    });
};
galleryWall();

// Function & Fetch By Artist 
const art = () => { 
  const searchParam = searchBar.value;  // Parameter for the Artist in the API URL
  const artAPI = `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&q=${searchParam}&limit=100`;

  fetch(artAPI)
    .then((response) => response.json())
    .then((artistArt) => {
      searchBar.value = "";
      gallerySection.innerHTML = "";
      tombStone(artistArt.data);
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
