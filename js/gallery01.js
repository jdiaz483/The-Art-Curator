const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchSubmit");
const gallerySection = document.getElementById("gallerySection");

const imageURLStart = "https://www.artic.edu/iiif/2/";
const imageURLEnd = "/full/843,/0/default.jpg";

const tombStone = (gallery) => {
  for (const artPiece of gallery) {
    if (artPiece.artist_display.length) {
      const imageID = artPiece.image_id;
      const wallSpace = document.createElement("div");
      wallSpace.className = "wallSpace";
      const image = document.createElement("img");
      image.src = imageURLStart + imageID + imageURLEnd;
      image.className = "primaryImage";
      const title = document.createElement("h2");
      title.textContent = artPiece.title;
      title.className = "title";
      const creationDate = document.createElement("h2");
      creationDate.textContent = `, ${artPiece.date_display}`;
      creationDate.className = "creationDate";
      const artist = document.createElement("h3");
      artist.innerHTML = artPiece.artist_display;
      artist.className = "artist";
      wallSpace.appendChild(image);
      wallSpace.appendChild(title);
      wallSpace.appendChild(creationDate);
      wallSpace.appendChild(artist);
      gallerySection.appendChild(wallSpace);
    }
  }
};

const galleryWall = () => {
  const galleryURL = `https://api.artic.edu/api/v1/artworks/search?=painting&fields=id,title,artist_display,date_display,medium_display,credit_line,main_reference_number,image_id&limit=80`;

  fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
      tombStone(gallery.data);
    });
};
galleryWall();

const art = () => {
  const searchParam = searchBar.value;
  const artAPI = `https://api.artic.edu/api/v1/artworks/search?q=${searchParam}&fields=id,title,artist_display,date_display,medium_display,credit_line,main_reference_number,image_id&limit=40`;

  fetch(artAPI)
    .then((response) => response.json())
    .then((artistArt) => {
      searchBar.value = "";
      gallerySection.innerHTML = "";
      tombStone(artistArt.data);
    });
};

searchButton.addEventListener("click", art);

searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});