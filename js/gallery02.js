const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchSubmit"); 
const gallerySection = document.getElementById("gallerySection"); 

const tombStone = (gallery) => {
  for (const artPiece of gallery) {
    if (artPiece.creators.length) {
      const wallSpace = document.createElement("div");
      wallSpace.className = "wallSpace";
      const image = document.createElement("img");
      image.src = artPiece.images.web.url;
      const title = document.createElement("h2");
      title.textContent = artPiece.title;
      title.className = "title";
      const creationDate = document.createElement("h2");
      creationDate.textContent = `, ${artPiece.creation_date}`;
      creationDate.className = "creationDate";
      const artist = document.createElement("h3");
      artist.innerHTML = artPiece.creators[0].description;
      artist.className = "artist";
      wallSpace.appendChild(image);
      wallSpace.appendChild(title);
      wallSpace.appendChild(creationDate);
      wallSpace.appendChild(artist);
      gallerySection.appendChild(wallSpace);
    };
  };
};

const galleryWall = () => {
  const galleryURL = `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=80`;

  fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
      tombStone(gallery.data);
    });
};

galleryWall();


const art = () => { 
  const searchParam = searchBar.value; 
  const artAPI = `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&q=${searchParam}&limit=40`;

  fetch(artAPI)
    .then((response) => response.json())
    .then((art) => {
      searchBar.value = "";
      gallerySection.innerHTML = "";
      tombStone(art.data);
    });
};


searchButton.addEventListener("click", art); 

searchBar.addEventListener("keyup", (e) => {  
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});