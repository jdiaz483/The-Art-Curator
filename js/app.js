fetch(`https://openaccess-api.clevelandart.org/api/artworks/?=titian`)
  .then(response => response.json())
  .then(data => console.log(data))

  fetch(`https://api.artic.edu/api/v1/artworks`)
  .then(response => response.json())
  .then(data => console.log(data))
