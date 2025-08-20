document.addEventListener('DOMContentLoaded', () => {

    const cloudName = "djbpyhruu"; // substitua pelo seu
    const tag = "formatura"; // mesma usada no upload

    async function loadGallery() {
        try {
            const res = await fetch(`https://res.cloudinary.com/${cloudName}/any/list/${tag}.json`);
            const data = await res.json();
            console.log(data);

            const gallery = document.getElementById("gallery");

            data.resources.forEach(item => {
                const col = document.createElement("div");
                col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

                if (item.resource_type === "image") {
                    col.innerHTML = `<img src="https://res.cloudinary.com/${cloudName}/image/upload/${item.public_id}.${item.format}"class="img-fluid">`;
                } else if (item.resource_type === "video") {
                    col.innerHTML = `<video controls class="img-fluid rounded shadow-sm"><source src="https://res.cloudinary.com/${cloudName}/video/upload/${item.public_id}.${item.format}" type="video/${item.format}"></video>`;
                }

                gallery.appendChild(col);
            });
        } catch (err) {
            const gallery = document.getElementById("gallery");
            const col = document.createElement("div");
            col.className = "col-8 mb-4";
            col.innerHTML = 'ERRO AO CARREGAR GALERIA!';
            gallery.appendChild(col);
            console.error("Erro ao carregar galeria", err);
        }
    }
    loadGallery();
})