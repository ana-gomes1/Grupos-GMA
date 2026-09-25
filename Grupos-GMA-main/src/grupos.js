const URL_API =
    'https://script.google.com/macros/s/AKfycbzCnf2jD4DO8UR5_lakqA_gtbRsjhWFeyZC92HAE9Q/exec';

let grupos = [];


// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    carregarGrupos();

    configurarBusca();

});


// =====================================================
// BUSCAR GRUPOS
// =====================================================

function carregarGrupos() {

    const tabela =
        document.getElementById('gruposTable');


    if (!tabela) {

        console.error(
            'Elemento #gruposTable não encontrado.'
        );

        return;

    }


    tabela.innerHTML = `
        <tr>
            <td
                colspan="6"
                class="text-center py-10 text-slate-500"
            >

                <div class="flex items-center justify-center gap-2">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Carregando grupos...

                </div>

            </td>
        </tr>
    `;


    const nomeCallback =
        'receberGrupos';


    window[nomeCallback] =
        function(dados) {

            console.log(
                'Grupos recebidos:',
                dados
            );


            // =============================================
            // VERIFICAR ERRO DA API
            // =============================================

            if (
                dados &&
                dados.sucesso === false
            ) {

                console.error(
                    'Erro retornado pela API:',
                    dados.mensagem
                );


                mostrarErro(
                    dados.mensagem ||
                    'Erro ao buscar grupos.'
                );


                limparCallback(
                    nomeCallback
                );

                return;

            }


            // =============================================
            // VERIFICAR ARRAY
            // =============================================

            if (!Array.isArray(dados)) {

                console.error(
                    'Resposta inesperada:',
                    dados
                );


                mostrarErro(
                    'A API não retornou uma lista de grupos.'
                );


                limparCallback(
                    nomeCallback
                );

                return;

            }


            // =============================================
            // GUARDAR GRUPOS
            // =============================================

            grupos =
                dados;


            console.log(
                'Quantidade de grupos:',
                grupos.length
            );


            // =============================================
            // RENDERIZAR
            // =============================================

            renderizarGrupos(
                grupos
            );


            // =============================================
            // LIMPAR CALLBACK
            // =============================================

            limparCallback(
                nomeCallback
            );

        };


    // =====================================================
    // CRIAR SCRIPT
    // =====================================================

    const script =
        document.createElement('script');


    script.src =
        `${URL_API}?acao=buscarGrupos&callback=${nomeCallback}`;


    script.onerror =
        function() {

            console.error(
                'Não foi possível acessar a API.'
            );


            mostrarErro(
                'Não foi possível conectar com a API.'
            );


            limparCallback(
                nomeCallback
            );

        };


    document.body.appendChild(
        script
    );

}


// =====================================================
// MOSTRAR ERRO
// =====================================================

function mostrarErro(mensagem) {

    const tabela =
        document.getElementById(
            'gruposTable'
        );


    if (!tabela) {

        return;

    }


    tabela.innerHTML = `
        <tr>
            <td
                colspan="6"
                class="text-center py-10 text-red-500"
            >

                <div class="flex flex-col items-center gap-2">

                    <i
                        class="
                            fa-solid
                            fa-triangle-exclamation
                            text-xl
                        "
                    ></i>

                    <span>
                        ${escaparHTML(mensagem)}
                    </span>

                </div>

            </td>
        </tr>
    `;

}


// =====================================================
// LIMPAR CALLBACK
// =====================================================

function limparCallback(nomeCallback) {

    delete window[nomeCallback];

}


// =====================================================
// RENDERIZAR GRUPOS
// =====================================================

function renderizarGrupos(lista) {

    const tabela =
        document.getElementById(
            'gruposTable'
        );


    const contador =
        document.getElementById(
            'contadorGrupos'
        );


    if (!tabela) {

        return;

    }


    tabela.innerHTML = '';


    // =================================================
    // NENHUM GRUPO
    // =================================================

    if (
        !lista ||
        lista.length === 0
    ) {

        tabela.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="text-center py-10 text-slate-500"
                >

                    Nenhum grupo encontrado.

                </td>
            </tr>
        `;


        if (contador) {

            contador.textContent =
                'Nenhum grupo cadastrado.';

        }


        return;

    }


    // =================================================
    // CONTADOR
    // =================================================

    if (contador) {

        contador.textContent =
            `Gerencie os ${lista.length} grupos cadastrados.`;

    }


    // =================================================
    // CRIAR LINHAS
    // =================================================

    lista.forEach(grupo => {

        const linha =
            document.createElement('tr');


        linha.className =
            'grupo-row border-b hover:bg-slate-50';


        linha.innerHTML = `

            <!-- GRUPO -->

            <td class="px-6 py-4">

                <div
                    class="font-medium text-slate-800"
                >

                    ${escaparHTML(grupo.nome)}

                </div>

            </td>


            <!-- ÁREA -->

            <td class="px-6 py-4 text-slate-600">

                ${escaparHTML(grupo.area)}

            </td>


            <!-- TURNO -->

            <td class="px-6 py-4 text-slate-600">

                <span class="mr-1">

                    ${iconeTurno(grupo.turno)}

                </span>

                ${escaparHTML(grupo.turno)}

            </td>


            <!-- INTEGRANTES -->

            <td class="px-6 py-4">

                <span class="text-slate-800">

                    0

                </span>

                <span class="text-slate-400">

                    /
                    ${escaparHTML(grupo.limite)}

                </span>

            </td>


            <!-- STATUS -->

            <td class="px-6 py-4">

                ${
                    converterBooleano(grupo.ativo)

                    ? `

                        <span
                            class="
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                bg-green-100
                                text-green-700
                            "
                        >

                            Ativo

                        </span>

                    `

                    : `

                        <span
                            class="
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                bg-slate-100
                                text-slate-500
                            "
                        >

                            Inativo

                        </span>

                    `
                }

            </td>


            <!-- AÇÕES -->

            <td class="px-6 py-4">

                <div class="flex gap-2">

                    <button
                        type="button"
                        onclick="editarGrupo('${escaparHTML(grupo.id)}')"
                        class="
                            text-blue-600
                            hover:text-blue-800
                        "
                        title="Editar grupo"
                    >

                        <i
                            class="fa-solid fa-pen"
                        ></i>

                    </button>


                    <button
                        type="button"
                        onclick="visualizarGrupo('${escaparHTML(grupo.id)}')"
                        class="
                            text-slate-500
                            hover:text-slate-700
                        "
                        title="Visualizar grupo"
                    >

                        <i
                            class="fa-solid fa-eye"
                        ></i>

                    </button>

                </div>

            </td>

        `;


        tabela.appendChild(
            linha
        );

    });

}


// =====================================================
// BUSCA
// =====================================================

function configurarBusca() {

    const campo =
        document.getElementById(
            'searchInput'
        );


    if (!campo) {

        return;

    }


    campo.addEventListener(
        'input',
        () => {

            const termo =
                campo.value
                    .toLowerCase()
                    .trim();


            const resultado =
                grupos.filter(grupo => {

                    return (

                        String(
                            grupo.nome || ''
                        )
                        .toLowerCase()
                        .includes(termo)

                        ||

                        String(
                            grupo.area || ''
                        )
                        .toLowerCase()
                        .includes(termo)

                        ||

                        String(
                            grupo.turno || ''
                        )
                        .toLowerCase()
                        .includes(termo)

                    );

                });


            renderizarGrupos(
                resultado
            );

        }
    );

}


// =====================================================
// EDITAR GRUPO
// =====================================================

function editarGrupo(id) {

    const grupo =
        grupos.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!grupo) {

        alert(
            'Grupo não encontrado.'
        );

        return;

    }


    document.getElementById(
        'grupoId'
    ).value =
        grupo.id || '';


    document.getElementById(
        'grupoNome'
    ).value =
        grupo.nome || '';


    document.getElementById(
        'grupoArea'
    ).value =
        grupo.area || '';


    document.getElementById(
        'grupoTurno'
    ).value =
        grupo.turno || '';


    document.getElementById(
        'grupoLimite'
    ).value =
        grupo.limite || '';


    document.getElementById(
        'grupoAtivo'
    ).checked =
        converterBooleano(
            grupo.ativo
        );


    document.getElementById(
        'modalTitulo'
    ).textContent =
        'Editar grupo';


    abrirModalGrupo();

}


// =====================================================
// ABRIR MODAL
// =====================================================

function abrirModalGrupo() {

    const modal =
        document.getElementById(
            'modalGrupo'
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        'hidden'
    );

}


// =====================================================
// FECHAR MODAL
// =====================================================

function fecharModalGrupo() {

    const modal =
        document.getElementById(
            'modalGrupo'
        );


    if (!modal) {

        return;

    }


    modal.classList.add(
        'hidden'
    );

}


// =====================================================
// ÍCONE DO TURNO
// =====================================================

function iconeTurno(turno) {

    switch (
        String(turno || '')
            .toLowerCase()
    ) {

        case 'manhã':
        case 'manha':

            return '☀️';


        case 'tarde':

            return '☁️';


        case 'noite':

            return '🌙';


        default:

            return '';

    }

}


// =====================================================
// CONVERTER BOOLEANO
// =====================================================

function converterBooleano(valor) {

    return (

        valor === true ||

        valor === 'true' ||

        valor === 'TRUE' ||

        valor === '1' ||

        valor === 1 ||

        valor === 'VERDADEIRO' ||

        valor === 'verdadeiro'

    );

}


// =====================================================
// PROTEGER HTML
// =====================================================

function escaparHTML(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return '';

    }


    return String(valor)

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );

}


// =====================================================
// VISUALIZAR GRUPO
// =====================================================

function visualizarGrupo(id) {

    editarGrupo(id);

}