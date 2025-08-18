// Variables Set
const cloudName = 'djbpyhruu';
const unsignedPreset = "formatura_laura"; // seu upload preset unsigned

// Selectors 
const btnUploadImg = document.getElementById("btnImgUpload");
const btnUploadVideo = document.getElementById("btnVideoUpload");


const inputImg = document.getElementById("imgUpload");
const inputVideo = document.getElementById("videosUpload");

const previewContainer = document.getElementById("previewContainer");
const enviarBtn = document.getElementById("btnEnviar");

// Clicar no botão abre o input hidden
btnUploadImg.addEventListener("click", () => inputImg.click());
btnUploadVideo.addEventListener("click", () => inputVideo.click());


let arquivosSelecionados = [];

// Quando usuário selecionar arquivos
function handleFiles(files) {
    arquivosSelecionados = [...files]; // sobrescreve lista
    previewContainer.innerHTML = "";   // limpa prévia anterior

    arquivosSelecionados.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            let element;
            if (file.type.startsWith("image")) {
                element = document.createElement("img");
                element.src = e.target.result;
                element.classList.add("img-thumbnail");
                element.style.maxWidth = "200px";
            } else if (file.type.startsWith("video")) {
                element = document.createElement("video");
                element.src = e.target.result;
                element.controls = true;
                element.style.maxWidth = "250px";
            }
            previewContainer.appendChild(element);
        };
        reader.readAsDataURL(file);
    });

    // abre o modal
    const modal = new bootstrap.Modal(document.getElementById("previewModal"));
    modal.show();
}

inputImg.addEventListener("change", () => handleFiles(inputImg.files));
inputVideo.addEventListener("change", () => handleFiles(inputVideo.files));

// Upload para Cloudinary
enviarBtn.addEventListener("click", async () => {
    if (!arquivosSelecionados.length) return;

    for (let file of arquivosSelecionados) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", unsignedPreset);
        formData.append("tags", "festa");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log("Upload feito:", data.secure_url);
    }

    arquivosSelecionados = [];
    previewContainer.innerHTML = "";
    bootstrap.Modal.getInstance(document.getElementById("previewModal")).hide();
});
