const img = document.getElementById("img");
const imgArray = [
    "images/01JohnBaptist.jpg",
    "images/02Rembrandt.jpg",
    "images/03Vermeer.jpg",
    "images/04Wounded.jpeg",
    "images/05Wave.jpg",
    "images/06Pisarro.jpg",
    "images/07Munch.jpg",
    "images/08Hopper.jpeg"
];
let imgIndex = 0;

function slideShow() {
    img.setAttribute("src", imgArray[imgIndex])
    imgIndex++;

    if(imgIndex >= imgArray.length) {
        imgIndex = 0;
    }
}

setInterval(slideShow, 2000);