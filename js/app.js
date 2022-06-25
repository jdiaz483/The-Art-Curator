const searchBar = document.getElementById("searchBar");     // Main Search Bar
const searchButton = document.getElementById("searchSubmit");   // Magnifying Glass - Search
const gallerySection = document.getElementById("gallerySection");


const getArt = () => {
  const searchParam = searchBar.value

const apiURL = `https://openaccess-api.clevelandart.org/api/artworks/?limit=10&has_image=1&artists=${searchParam}`;

  fetch(apiURL)
  .then(response => response.json())
  .then(artData => {
    searchBar.value = "";
    gallerySection.innerHTML = "";
    for (const artInfo of artData.data) {
    const divForArt = document.createElement("div");
    divForArt.className = "artInfo"
    const artImage = document.createElement("img");
    artImage.src = artInfo.images.web.url;
    const title = document.createElement("h4");
    title.textContent = artInfo.title;
    const artMeasurements = document.createElement("h5");
    artMeasurements.textContent = artInfo.measurements;
    divForArt.appendChild(artImage);
    divForArt.appendChild(title);
    divForArt.appendChild(artMeasurements);
    gallerySection.appendChild(divForArt);
    }});

}
searchButton.addEventListener("click", getArt);


  searchBar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      getArt();
    }
  });