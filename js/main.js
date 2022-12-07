
// hold all the inputs and buttons 
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayScale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hueRotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.getElementById("reset");

let img = document.getElementById("img");
let imgBox = document.querySelector(".img-box");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// function to reset the values to default values 
// and redraw the canvas
function resetValue (){
    ctx.filter = "none" ;
    saturate.value = "100" ;
    contrast.value = "100" ;
    brightness.value = "100" ;
    sepia.value = "0" ;
    grayScale.value = "0" ;
    blur.value = "0" ;
    hueRotate.value = "0" ;
    ctx.drawImage(img ,0 ,0 ,canvas.width ,canvas.height );
}


// hide download and reset buttons
// and the img-box when there is no pic yet 
window.onload = ()=>{
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}


// show download and reset buttons
// and the img-box when there is pic  
upload.onchange = ()=>{
    resetValue();
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";

    // receive the img to display it 
    let file = new FileReader() ;
    file.readAsDataURL(upload.files[0]);

    // show the pic when its loaded 
    file.onload = ()=>{
        img.src = file.result ;
    }

    // create a copy of the image as canvas 
    img.onload = ()=>{
        canvas.width = img.width ;
        canvas.height = img.height ;
        ctx.drawImage(img ,0 ,0 ,canvas.width ,canvas.height );
        img.style.display="none";
    }

}


// apply the filters on the canvas 
let filters = document.querySelectorAll("ul li input");
filters.forEach( filter => {
    filter.addEventListener("input" , ()=>{
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayScale(${grayScale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img ,0 ,0 ,canvas.width ,canvas.height );
    })
});


// download the edited image
download.onclick = ()=>{
    download.href = canvas.toDataURL() ;
}


