function abrirModalGrupo() {

        document
            .getElementById("modalGrupo")
            .classList.remove("hidden");

        document
            .getElementById("modalTitulo")
            .textContent = "Novo grupo";

        document
            .getElementById("grupoNome")
            .value = "";

    }


    function editarGrupo(nome) {

        document
            .getElementById("modalGrupo")
            .classList.remove("hidden");

        document
            .getElementById("modalTitulo")
            .textContent = "Editar grupo";

        document
            .getElementById("grupoNome")
            .value = nome;

    }


    function fecharModalGrupo() {

        document
            .getElementById("modalGrupo")
            .classList.add("hidden");

    }


    function salvarGrupo() {

        alert("Grupo salvo com sucesso!");

        fecharModalGrupo();

    }


    /* ==========================================
       MODAL INTEGRANTE
    ========================================== */

    function abrirModalIntegrante() {

        document
            .getElementById("modalIntegrante")
            .classList.remove("hidden");

    }


    function editarIntegrante(nome) {

        document
            .getElementById("modalIntegrante")
            .classList.remove("hidden");

    }


    function fecharModalIntegrante() {

        document
            .getElementById("modalIntegrante")
            .classList.add("hidden");

    }


    /* ==========================================
       PREVIEW DA FOTO
    ========================================== */

    document
        .getElementById("fotoInput")
        .addEventListener("change", function(event) {

            const arquivo = event.target.files[0];

            if (!arquivo) return;

            const leitor = new FileReader();

            leitor.onload = function(e) {

                document
                    .getElementById("previewFoto")
                    .src = e.target.result;

            };

            leitor.readAsDataURL(arquivo);

        });


    /* ==========================================
       VISUALIZAR GRUPO
    ========================================== */

    function visualizarGrupo(nome) {

        editarGrupo(nome);

    }

document
        .getElementById("searchInput")
        .addEventListener("input", function() {

            const termo =
                this.value.toLowerCase();

            const grupos =
                document.querySelectorAll(".grupo-row");

            grupos.forEach(function(grupo) {

                const texto =
                    grupo.innerText.toLowerCase();

                if (texto.includes(termo)) {

                    grupo.style.display = "";

                } else {

                    grupo.style.display = "none";

                }

            });

        });