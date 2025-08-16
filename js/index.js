// Variables Set
const cloudinaryAPIKey = 589871722813249;
const cloudinaryAPISecret = 'sKBQ1-L73Xsc-bMkLHogGX5S7Uk';

// Selectors 
const btnUploadImg = document.getElementById("btnImgUpload");
const btnUploadVideo = document.getElementById("btnVideoUpload");


const inputImg = document.getElementById("imgUpload");
const inputVideo = document.getElementById("videosUpload");


// Clicar no botão abre o input hidden
btnUploadImg.addEventListener("click", () => inputImg.click());
btnUploadVideo.addEventListener("click", () => inputVideo.click());
