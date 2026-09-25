

const paginaAtual = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-item").forEach(item => {

    const pagina = item.getAttribute("href");

    if (pagina === paginaAtual) {
        item.classList.add("bg-primary", "text-white");
    }

});