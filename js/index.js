// Set variables
const cloudName = 'djbpyhruu';
const unsignedPreset = "formatura_laura"; //Folder

// Upload buttons
const btnUploadImg = document.getElementById("btnImgUpload");
const btnUploadVideo = document.getElementById("btnVideoUpload");

//Files inputs for images and videos
const inputImg = document.getElementById("imgs");
const inputVideo = document.getElementById("videos");

// Fire event for files inputs
btnUploadImg.addEventListener("click", () => inputImg.click());
btnUploadVideo.addEventListener("click", () => inputVideo.click());


//Modal Preview Selectors
const previewContainer = document.getElementById("previewContainer");
const enviarBtn = document.getElementById("btnEnviar");
const excluirBtn = document.getElementById('btnExcluir');

//Arquivos selecionados e array de URls para imagens e videos
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
                element.style.objectFit = "cover";
            } else if (file.type.startsWith("video")) {
                element = document.createElement("video");
                element.src = e.target.result;
                element.controls = true;
                element.style.maxWidth = "250px";
                element.style.objectFit = "cover";
            }
            previewContainer.appendChild(element);
        };
        reader.readAsDataURL(file);
    });

    // Open modal
    const modal = new bootstrap.Modal(document.getElementById("previewModal"));
    modal.show();
}

inputImg.addEventListener("change", () => handleFiles(inputImg.files));
inputVideo.addEventListener("change", () => handleFiles(inputVideo.files));



// Upload for Cloudinary
enviarBtn.addEventListener("click", async () => {
    if (!arquivosSelecionados.length) return;

    // Defina as tags desejadas
    const tags = "formatura"; // Adicione suas tags aqui

    try {
        for (let file of arquivosSelecionados) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", unsignedPreset);
            formData.append("tags", tags)

            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log('Upload feito: ', data);

        }
        // Limpa e fecha modal após todos os uploads
        arquivosSelecionados = [];
        previewContainer.innerHTML = "";
        bootstrap.Modal.getInstance(document.getElementById("previewModal")).hide();

        // reset inputs
        inputImg.value = "";
        inputVideo.value = "";

        const toastSuccess = document.getElementById('successToast');
        toastSuccess.style.display = 'block';


    } catch (error) {
        console.error(error);

        arquivosSelecionados = [];
        previewContainer.innerHTML = "";
        bootstrap.Modal.getInstance(document.getElementById("previewModal")).hide();

        // reset inputs
        inputImg.value = "";
        inputVideo.value = "";

        const toastError = document.getElementById('errorToast');
        toastError.style.display = 'block';
    }
});

// Delete files selected

excluirBtn.addEventListener('click', () => {
    arquivosSelecionados = [];
    previewContainer.innerHTML = "";

    // reset inputs
    inputImg.value = "";
    inputVideo.value = "";
    bootstrap.Modal.getInstance(document.getElementById("previewModal")).hide();
})
