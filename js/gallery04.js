const searchBar = document.getElementById("searchBar"); 
const searchButton = document.getElementById("searchSubmit"); 
const gallerySection = document.getElementById("gallerySection"); 

const tombStone = (gallery) => {
  for (const artPiece of gallery) {
    if (artPiece.object_number.length) {
      const wallSpace = document.createElement("div");
      wallSpace.className = "wallSpace";
      const image = document.createElement("img");
      image.src = artPiece.image_thumbnail;
      const title = document.createElement("h2");
      title.textContent = artPiece.titles[0].title;
      title.className = "artworkTitle";
      const creationDate = document.createElement("h2");
      creationDate.textContent = `, c. ${artPiece.production_date[0].period}`;
      creationDate.className = "creationDate";
      const artist = document.createElement("h3");
      artist.textContent =artPiece.artist[0];
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
    const galleryURL = `https://api.smk.dk/api/v1/art/search?keys=*&qfields=titles&filters=[has_image:true],[object_names:painting],[public_domain:true]&offset=0&rows=80&lang=en`;
    
    fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
        tombStone(gallery.items);
    });
};

galleryWall();


const art = () => { 
    const searchParam = searchBar.value;  
    const artAPI = `https://api.smk.dk/api/v1/art/search?keys=${searchParam}&q&filters=[has_image:true],[object_names:painting],[public_domain:true]&offset=0&rows=40&lang=en`;
  
    fetch(artAPI)
      .then((response) => response.json())
      .then((art) => {
        searchBar.value = "";
        gallerySection.innerHTML = "";
        tombStone(art.items);
      });
  };


searchButton.addEventListener("click", art); 

searchBar.addEventListener("keyup", (e) => { 
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});