const integrantes = [
    {
        id: 1,
        foto: "https://i.pravatar.cc/150?img=47",
        nome: "Ana Silva",
        matricula: "12345",
        grupo: "Grupo Inovação",
        funcao: "Líder",
        email: "ana.silva@empresa.com.br",
        turno: "Manhã",
        ramal: "2145",
        celular: "(47) 99999-1111",
        cargo: "Analista de TI",
        area: "TI"
    },

    {
        id: 2,
        foto: "https://i.pravatar.cc/150?img=12",
        nome: "Bruno Costa",
        matricula: "23456",
        grupo: "Grupo Zelseg",
        funcao: "Integrante",
        email: "bruno.costa@empresa.com.br",
        turno: "Tarde",
        ramal: "2180",
        celular: "(47) 99999-2222",
        cargo: "Técnico de Produção",
        area: "Produção"
    },

    {
        id: 3,
        foto: "https://i.pravatar.cc/150?img=32",
        nome: "Carla Souza",
        matricula: "34567",
        grupo: "Grupo Evolução",
        funcao: "Secretário",
        email: "carla.souza@empresa.com.br",
        turno: "Noite",
        ramal: "2214",
        celular: "(47) 99999-3333",
        cargo: "Assistente Administrativo",
        area: "Qualidade"
    },

    {
        id: 4,
        foto: "https://i.pravatar.cc/150?img=5",
        nome: "Daniel Lima",
        matricula: "45678",
        grupo: "Grupo Tesla",
        funcao: "Integrante",
        email: "daniel.lima@empresa.com.br",
        turno: "Manhã",
        ramal: "2250",
        celular: "(47) 99999-4444",
        cargo: "Analista de Logística",
        area: "Logística"
    },

    {
        id: 5,
        foto: "https://i.pravatar.cc/150?img=44",
        nome: "Eduarda Alves",
        matricula: "56789",
        grupo: "Grupo Alpha",
        funcao: "Supervisora",
        email: "eduarda.alves@empresa.com.br",
        turno: "Tarde",
        ramal: "2301",
        celular: "(47) 99999-5555",
        cargo: "Supervisora de Manutenção",
        area: "Manutenção"
    },

    {
        id: 6,
        foto: "https://i.pravatar.cc/150?img=11",
        nome: "Felipe Martins",
        matricula: "67890",
        grupo: "Grupo Beta",
        funcao: "Líder",
        email: "felipe.martins@empresa.com.br",
        turno: "Noite",
        ramal: "2310",
        celular: "(47) 99999-6666",
        cargo: "Analista Administrativo",
        area: "Administrativo"
    },

    {
        id: 7,
        foto: "https://i.pravatar.cc/150?img=49",
        nome: "Gabriela Rocha",
        matricula: "78901",
        grupo: "Grupo Gama",
        funcao: "Integrante",
        email: "gabriela.rocha@empresa.com.br",
        turno: "Manhã",
        ramal: "2355",
        celular: "(47) 99999-7777",
        cargo: "Técnica de Produção",
        area: "Produção"
    },

    {
        id: 8,
        foto: "https://i.pravatar.cc/150?img=13",
        nome: "Gustavo Ferreira",
        matricula: "89012",
        grupo: "Grupo Delta",
        funcao: "Secretário",
        email: "gustavo.ferreira@empresa.com.br",
        turno: "Tarde",
        ramal: "2402",
        celular: "(47) 99999-8888",
        cargo: "Analista de Sistemas",
        area: "TI"
    }
];


// ELEMENTOS

const tabela = document.getElementById("tabelaIntegrantes");

const busca = document.getElementById("buscarIntegrante");

const modal = document.getElementById("modalIntegrante");

const fecharModal = document.getElementById("fecharModal");

const btnFecharModal = document.getElementById("btnFecharModal");


// RENDERIZAR TABELA

function renderizarIntegrantes(lista) {

    tabela.innerHTML = "";

    lista.forEach(integrante => {

        const linha = document.createElement("tr");

        linha.className =
            "border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer";


        linha.innerHTML = `

            <td class="px-5 py-4">

                <div class="flex items-center gap-3">

                    <img
                        src="${integrante.foto}"
                        class="w-10 h-10 rounded-full object-cover">

                    <div>

                        <p class="font-medium text-slate-800">
                            ${integrante.nome}
                        </p>

                        <p class="text-xs text-slate-400">
                            ${integrante.cargo}
                        </p>

                    </div>

                </div>

            </td>


            <td class="px-5 py-4 text-sm text-slate-600">

                ${integrante.matricula}

            </td>


            <td class="px-5 py-4 text-sm text-slate-600">

                ${integrante.grupo}

            </td>

            <td class="px-5 py-4 text-sm text-slate-600 max-w-[240px]">

                <span
                    class="block truncate"
                    title="${integrante.email}">
                    ${integrante.email}
                </span>

            </td>


            <td class="px-5 py-4">

                <span class="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-blue-50
                    text-blue-600
                ">

                    ${integrante.funcao}

                </span>

            </td>


            <td class="px-5 py-4 text-sm text-slate-600">

                ${integrante.area}

            </td>


            <td class="px-5 py-4 text-sm text-slate-600">

                ${integrante.turno}

            </td>


            <td class="px-5 py-4">

                <button
                    class="btn-detalhes w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500"
                    data-id="${integrante.id}">

                    <i class="fa-solid fa-ellipsis-vertical"></i>

                </button>

            </td>

        `;


        tabela.appendChild(linha);

    });


    // BOTÕES DE DETALHES

    document.querySelectorAll(".btn-detalhes").forEach(botao => {

        botao.addEventListener("click", (evento) => {

            evento.stopPropagation();

            const id = Number(botao.dataset.id);

            abrirModal(id);

        });

    });

}


// ABRIR MODAL

function abrirModal(id) {

    const integrante =
        integrantes.find(item => item.id === id);

    if (!integrante) return;


    document.getElementById("modalFoto").src =
        integrante.foto;

    document.getElementById("modalNome").textContent =
        integrante.nome;

    document.getElementById("modalGrupo").textContent =
        integrante.grupo;


    document.getElementById("modalNomeCompleto").textContent =
        integrante.nome;

    document.getElementById("modalMatricula").textContent =
        integrante.matricula;

    document.getElementById("modalGrupoCompleto").textContent =
        integrante.grupo;

    document.getElementById("modalFuncao").textContent =
        integrante.funcao;

    document.getElementById("modalEmail").textContent =
        integrante.email;

    document.getElementById("modalTurno").textContent =
        integrante.turno;

    document.getElementById("modalRamal").textContent =
        integrante.ramal;

    document.getElementById("modalCelular").textContent =
        integrante.celular;

    document.getElementById("modalCargo").textContent =
        integrante.cargo;

    document.getElementById("modalArea").textContent =
        integrante.area;


    modal.classList.remove("hidden");

    modal.classList.add("flex");

}


// FECHAR MODAL

function fecharModalIntegrante() {

    modal.classList.add("hidden");

    modal.classList.remove("flex");

}


fecharModal.addEventListener(
    "click",
    fecharModalIntegrante
);

btnFecharModal.addEventListener(
    "click",
    fecharModalIntegrante
);


// FECHAR CLICANDO FORA

modal.addEventListener("click", (evento) => {

    if (evento.target === modal) {

        fecharModalIntegrante();

    }

});


// BUSCA

busca.addEventListener("input", () => {

    const termo =
        busca.value.toLowerCase().trim();


    const resultado = integrantes.filter(integrante => {

        return (

            integrante.nome
                .toLowerCase()
                .includes(termo)

            ||

            integrante.matricula
                .toLowerCase()
                .includes(termo)

            ||

            integrante.grupo
                .toLowerCase()
                .includes(termo)

            ||

            integrante.cargo
                .toLowerCase()
                .includes(termo)

            ||

            integrante.area
                .toLowerCase()
                .includes(termo)

        );

    });


    renderizarIntegrantes(resultado);

});


// EXPORTAR

document.getElementById("btnExportar")
    .addEventListener("click", () => {

        let csv =
            "Nome;Matricula;Grupo;Funcao;Email;Turno;Ramal;Celular;Cargo;Area\n";


        integrantes.forEach(integrante => {

            csv +=
                `"${integrante.nome}";` +
                `"${integrante.matricula}";` +
                `"${integrante.grupo}";` +
                `"${integrante.funcao}";` +
                `"${integrante.email}";` +
                `"${integrante.turno}";` +
                `"${integrante.ramal}";` +
                `"${integrante.celular}";` +
                `"${integrante.cargo}";` +
                `"${integrante.area}"\n`;

        });


        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "integrantes-igrupos.csv";


        link.click();


        URL.revokeObjectURL(url);

    });


// INICIALIZA

renderizarIntegrantes(integrantes);