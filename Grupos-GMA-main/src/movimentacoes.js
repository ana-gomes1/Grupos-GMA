    // ==========================================
// LINK DO GOOGLE FORMS
// ==========================================

const linkForms =
    "https://forms.google.com/seu-formulario-aqui";


// ==========================================
// DADOS DE EXEMPLO
// ==========================================

const movimentacoes = [

    {
        id: 1,
        tipo: "Entrada",
        nome: "Ana Silva",
        matricula: "12345",
        grupo: "Grupo Inovação",
        email: "ana.silva@empresa.com.br",
        data: "24/09/2026",
        horario: "08:32",
        responsavel: "Sistema"
    },

    {
        id: 2,
        tipo: "Saída",
        nome: "Bruno Costa",
        matricula: "23456",
        grupo: "Grupo Zelseg",
        email: "bruno.costa@empresa.com.br",
        data: "23/09/2026",
        horario: "16:45",
        responsavel: "Sistema"
    },

    {
        id: 3,
        tipo: "Entrada",
        nome: "Carla Souza",
        matricula: "34567",
        grupo: "Grupo Evolução",
        email: "carla.souza@empresa.com.br",
        data: "23/09/2026",
        horario: "07:58",
        responsavel: "Sistema"
    },

    {
        id: 4,
        tipo: "Saída",
        nome: "Daniel Lima",
        matricula: "45678",
        grupo: "Grupo Tesla",
        email: "daniel.lima@empresa.com.br",
        data: "22/09/2026",
        horario: "17:12",
        responsavel: "Sistema"
    },

    {
        id: 5,
        tipo: "Entrada",
        nome: "Eduarda Alves",
        matricula: "56789",
        grupo: "Grupo Alpha",
        email: "eduarda.alves@empresa.com.br",
        data: "22/09/2026",
        horario: "08:10",
        responsavel: "Sistema"
    },

    {
        id: 6,
        tipo: "Entrada",
        nome: "Felipe Martins",
        matricula: "67890",
        grupo: "Grupo Beta",
        email: "felipe.martins@empresa.com.br",
        data: "21/09/2026",
        horario: "18:04",
        responsavel: "Sistema"
    }

];


// ==========================================
// ELEMENTOS
// ==========================================

const tabela =
    document.getElementById("tabelaMovimentacoes");

const busca =
    document.getElementById("buscarMovimentacao");


// ==========================================
// QR CODE
// ==========================================

const qrCode =
    document.getElementById("qrCode");


// API pública para gerar o QR Code
qrCode.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(linkForms)}`;


// ==========================================
// BOTÃO DO FORMULÁRIO
// ==========================================

document
    .getElementById("btnAbrirForms")
    .addEventListener("click", () => {

        window.open(
            linkForms,
            "_blank"
        );

    });


// ==========================================
// RENDERIZAR TABELA
// ==========================================

function renderizarMovimentacoes(lista) {

    tabela.innerHTML = "";


    lista.forEach(movimentacao => {

        const linha =
            document.createElement("tr");


        linha.className =
            "border-b border-slate-100 hover:bg-slate-50 transition";


        const entrada =
            movimentacao.tipo === "Entrada";


        linha.innerHTML = `

            <td class="px-6 py-4">

                <span class="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-medium
                    ${entrada
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }
                ">

                    <i class="fa-solid ${
                        entrada
                            ? "fa-arrow-right-to-bracket"
                            : "fa-arrow-right-from-bracket"
                    }"></i>

                    ${movimentacao.tipo}

                </span>

            </td>


            <td class="px-6 py-4">

                <p class="font-medium text-slate-800">
                    ${movimentacao.nome}
                </p>

            </td>


            <td class="px-6 py-4 text-sm text-slate-600">

                ${movimentacao.matricula}

            </td>


            <td class="px-6 py-4 text-sm text-slate-600">

                ${movimentacao.grupo}

            </td>


            <td class="px-6 py-4 text-sm text-slate-600 max-w-[240px]">

                <span
                    class="block truncate"
                    title="${movimentacao.email}">

                    ${movimentacao.email}

                </span>

            </td>


            <td class="px-6 py-4 text-sm text-slate-600">

                ${movimentacao.data}

            </td>


            <td class="px-6 py-4 text-sm text-slate-600">

                ${movimentacao.horario}

            </td>


            <td class="px-6 py-4 text-sm text-slate-600">

                ${movimentacao.responsavel}

            </td>

        `;


        tabela.appendChild(linha);

    });

}


// ==========================================
// RESUMO
// ==========================================

function atualizarResumo(lista) {

    const entradas =
        lista.filter(
            item => item.tipo === "Entrada"
        ).length;


    const saidas =
        lista.filter(
            item => item.tipo === "Saída"
        ).length;


    document.getElementById("totalEntradas")
        .textContent = entradas;


    document.getElementById("totalSaidas")
        .textContent = saidas;


    document.getElementById("totalMovimentacoes")
        .textContent = lista.length;

}


// ==========================================
// BUSCA
// ==========================================

busca.addEventListener("input", () => {

    const termo =
        busca.value
            .toLowerCase()
            .trim();


    const resultado =
        movimentacoes.filter(item => {

            return (

                item.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                item.matricula
                    .toLowerCase()
                    .includes(termo)

                ||

                item.grupo
                    .toLowerCase()
                    .includes(termo)

                ||

                item.email
                    .toLowerCase()
                    .includes(termo)

                ||

                item.tipo
                    .toLowerCase()
                    .includes(termo)

            );

        });


    renderizarMovimentacoes(resultado);

    atualizarResumo(resultado);

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderizarMovimentacoes(movimentacoes);

atualizarResumo(movimentacoes);