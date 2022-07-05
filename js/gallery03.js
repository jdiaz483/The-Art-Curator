// Navbar 
const navbarToggle = navbar.querySelector('#navbar-toggle');
let isNavbarExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute('aria-expanded', isNavbarExpanded);
};

navbarToggle.addEventListener('click', toggleNavbarVisibility);

const navbarMenu = document.querySelector('#navbar-menu');
const navbarLinksContainer = navbarMenu.querySelector('.navbar-links');

navbarLinksContainer.addEventListener('click', (e) => e.stopPropagation());
navbarMenu.addEventListener('click', toggleNavbarVisibility);

// Main
const searchBar = document.getElementById("searchBar"); 
const searchButton = document.getElementById("searchSubmit");
const gallerySection = document.getElementById("gallerySection");

const tombStone = (gallery) => {
    for (const artPiece of gallery) {
        if (artPiece.title.length) {
            const wallSpace = document.createElement("div");
            wallSpace.className = "wallSpace";
            const image = document.createElement("img");
            image.src = artPiece.webImage.url;
            image.className = "artImage";
            image.setAttribute('id', 'artImage');
            const title = document.createElement("h1");
            title.textContent = artPiece.title;
            title.className = "title"
            const creationDate = document.createElement("h2");
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

const galleryWall = () => {
    const galleryURL = `https://www.rijksmuseum.nl/api/en/collection?key=KIfNKQsl&imgonly=True&toppieces=True&type=painting&culture=en&ps=80`;

    fetch(galleryURL)
    .then((response) => response.json())
    .then((gallery) => {
      tombStone(gallery.artObjects);
    });
};

galleryWall();

const art = () => {
    const searchParam = searchBar.value; 
    const artAPI = `https://www.rijksmuseum.nl/api/en/collection?key=KIfNKQsl&imgonly=True&type=painting&culture=en&ps=40&q=${searchParam}`;
    
    fetch(artAPI)
    .then((response) => response.json())
    .then((art) => {
      searchBar.value = "";
      gallerySection.innerHTML = "";
      tombStone(art.artObjects);
    });
};

const modal = document.getElementById("artModal");

const modalImg = document.getElementById("modalImage");

document.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.id==="artImage") {
    modal.style.display = "block";
    modalImg.src = elem.dataset.biggerSrc || elem.src;
  };
});

const span = document.getElementsByClassName("close") [0];

span.onclick = () => {
  modal.style.display = "none";
};

searchButton.addEventListener("click", art); 

searchBar.addEventListener("keyup", (e) => {  
  if (e.keyCode === 13) {
    e.preventDefault();
    art();
  }
});