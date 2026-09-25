// =====================================================
// CONFIGURAÇÃO
// =====================================================

const URL_API =
    'https://script.google.com/macros/s/AKfycbzCnf2jD4DO8UR5_lakqA_gtbRsjhWFeyZC92HAE9Q/dev';


// =====================================================
// ELEMENTOS DO HTML
// =====================================================

const modal = document.getElementById('modalIntegrante');
const form = document.getElementById('formIntegrante');

const btnEditar = document.getElementById('btnEditar');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelarEdicao');
const btnFechar = document.getElementById('btnFecharModal');
const btnFecharX = document.getElementById('fecharModal');

const tabela = document.getElementById('tabelaIntegrantes');
const busca = document.getElementById('buscarIntegrante');


// =====================================================
// VARIÁVEIS
// =====================================================

let integranteAtual = null;
let dadosOriginais = {};

let todosIntegrantes = [];


// =====================================================
// CAMPOS EDITÁVEIS
// =====================================================

const campos = [
    'nome',
    'matricula',
    'grupo',
    'funcao',
    'email',
    'turno',
    'ramal',
    'celular',
    'cargo',
    'area'
];


// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    console.log('Integrantes.js carregado.');

    carregarIntegrantes();

});


// =====================================================
// CARREGAR INTEGRANTES
// =====================================================

async function carregarIntegrantes() {

    try {

        console.log('Buscando integrantes...');

        tabela.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="px-5 py-8 text-center text-slate-500"
                >
                    Carregando integrantes...
                </td>
            </tr>
        `;


        const url =
            `${URL_API}?acao=buscarIntegrantes`;


        console.log('URL da API:', url);


        const resposta =
            await fetch(url);


        console.log(
            'Status da resposta:',
            resposta.status
        );


        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );

        }


        const texto =
            await resposta.text();


        console.log(
            'Resposta do Apps Script:',
            texto
        );


        let integrantes;

        try {

            integrantes =
                JSON.parse(texto);

        } catch (erroJSON) {

            console.error(
                'Resposta não é um JSON válido:',
                texto
            );

            throw new Error(
                'O Apps Script não retornou um JSON válido.'
            );

        }


        console.log(
            'Integrantes recebidos:',
            integrantes
        );


        if (!Array.isArray(integrantes)) {

            throw new Error(
                integrantes.mensagem ||
                'Erro ao buscar integrantes.'
            );

        }


        todosIntegrantes = integrantes;


        renderizarTabela(
            todosIntegrantes
        );


    } catch (erro) {

        console.error(
            'ERRO AO CARREGAR INTEGRANTES:',
            erro
        );


        tabela.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="px-5 py-8 text-center text-red-500"
                >
                    Erro ao carregar integrantes.
                </td>
            </tr>
        `;

    }

}


// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarTabela(integrantes) {

    tabela.innerHTML = '';


    if (!integrantes || integrantes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="px-5 py-8 text-center text-slate-500"
                >
                    Nenhum integrante encontrado.
                </td>
            </tr>
        `;

        return;

    }


    integrantes.forEach(integrante => {

        const tr =
            document.createElement('tr');


        tr.className =
            'border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer';


        tr.innerHTML = `

            <td class="px-5 py-4 text-sm text-slate-800 font-medium">
                ${escaparHTML(integrante.nome)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.matricula)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.grupo)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.email)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.funcao)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.area)}
            </td>

            <td class="px-5 py-4 text-sm text-slate-600">
                ${escaparHTML(integrante.turno)}
            </td>

            <td class="px-5 py-4 text-center">

                <button
                    type="button"
                    class="btnAbrirIntegrante w-9 h-9 rounded-lg
                           hover:bg-slate-100 text-slate-500"
                >

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </td>

        `;


        tr.addEventListener(
            'click',
            () => {

                abrirModal(integrante);

            }
        );


        tabela.appendChild(tr);

    });

}


// =====================================================
// ABRIR MODAL
// =====================================================

function abrirModal(integrante) {

    integranteAtual =
        { ...integrante };


    dadosOriginais = {};


    campos.forEach(campo => {

        dadosOriginais[campo] =
            normalizarValor(
                integrante[campo]
            );

    });


    campos.forEach(campo => {

        const elemento =
            document.querySelector(
                `[name="${campo}"]`
            );


        if (elemento) {

            elemento.value =
                integrante[campo] ?? '';

        }

    });


    const modalNome =
        document.getElementById('modalNome');


    if (modalNome) {

        modalNome.textContent =
            integrante.nome ||
            'Integrante';

    }


    const modalGrupo =
        document.getElementById('modalGrupo');


    if (modalGrupo) {

        modalGrupo.textContent =
            integrante.grupo || '';

    }


    const foto =
        document.getElementById('modalFoto');


    if (foto) {

        if (integrante.foto) {

            foto.src =
                integrante.foto;

        } else {

            foto.src =
                'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(
                    integrante.nome ||
                    'Integrante'
                ) +
                '&background=random&color=fff';

        }

    }


    sairModoEdicao();


    modal.classList.remove('hidden');
    modal.classList.add('flex');

}


// =====================================================
// ENTRAR EM MODO DE EDIÇÃO
// =====================================================

function entrarModoEdicao() {

    campos.forEach(campo => {

        const elemento =
            document.querySelector(
                `[name="${campo}"]`
            );


        if (elemento) {

            elemento.disabled =
                false;

            elemento.classList.remove(
                'bg-slate-50'
            );

            elemento.classList.add(
                'bg-white'
            );

        }

    });


    btnEditar.classList.add(
        'hidden'
    );

    btnSalvar.classList.remove(
        'hidden'
    );

    btnCancelar.classList.remove(
        'hidden'
    );

    btnFechar.classList.add(
        'hidden'
    );

}


// =====================================================
// SAIR DO MODO DE EDIÇÃO
// =====================================================

function sairModoEdicao() {

    campos.forEach(campo => {

        const elemento =
            document.querySelector(
                `[name="${campo}"]`
            );


        if (elemento) {

            elemento.disabled =
                true;

            elemento.classList.remove(
                'bg-white'
            );

            elemento.classList.add(
                'bg-slate-50'
            );

        }

    });


    btnEditar.classList.remove(
        'hidden'
    );

    btnSalvar.classList.add(
        'hidden'
    );

    btnCancelar.classList.add(
        'hidden'
    );

    btnFechar.classList.remove(
        'hidden'
    );

}


// =====================================================
// EDITAR
// =====================================================

btnEditar.addEventListener(
    'click',
    () => {

        entrarModoEdicao();

    }
);


// =====================================================
// CANCELAR EDIÇÃO
// =====================================================

btnCancelar.addEventListener(
    'click',
    () => {

        campos.forEach(campo => {

            const elemento =
                document.querySelector(
                    `[name="${campo}"]`
                );


            if (elemento) {

                elemento.value =
                    dadosOriginais[campo] ?? '';

            }

        });


        sairModoEdicao();

    }
);


// =====================================================
// SALVAR ALTERAÇÕES
// =====================================================

form.addEventListener(
    'submit',
    async event => {

        event.preventDefault();


        const alteracoes = {};


        campos.forEach(campo => {

            const elemento =
                document.querySelector(
                    `[name="${campo}"]`
                );


            if (!elemento) {

                return;

            }


            const valorAtual =
                normalizarValor(
                    elemento.value
                );


            const valorOriginal =
                normalizarValor(
                    dadosOriginais[campo]
                );


            if (
                valorAtual !==
                valorOriginal
            ) {

                alteracoes[campo] =
                    elemento.value.trim();

            }

        });


        // ---------------------------------------------
        // NENHUMA ALTERAÇÃO
        // ---------------------------------------------

        if (
            Object.keys(alteracoes).length === 0
        ) {

            alert(
                'Nenhuma alteração foi realizada.'
            );

            return;

        }


        // ---------------------------------------------
        // DESABILITAR BOTÃO
        // ---------------------------------------------

        btnSalvar.disabled =
            true;


        btnSalvar.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin mr-2"></i>
            Salvando...
        `;


        try {

            console.log(
                'Enviando alterações:',
                alteracoes
            );


            const resposta =
                await fetch(
                    URL_API,
                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'text/plain;charset=utf-8'

                        },

                        body:
                            JSON.stringify({

                                acao:
                                    'atualizarIntegrante',

                                id:
                                    integranteAtual.id,

                                alteracoes:
                                    alteracoes

                            })

                    }
                );


            const texto =
                await resposta.text();


            console.log(
                'Resposta do servidor:',
                texto
            );


            let resultado;


            try {

                resultado =
                    JSON.parse(texto);

            } catch (erroJSON) {

                throw new Error(
                    'O Apps Script não retornou um JSON válido.'
                );

            }


            if (!resultado.sucesso) {

                throw new Error(
                    resultado.mensagem ||
                    'Não foi possível atualizar o integrante.'
                );

            }


            alert(
                'Integrante atualizado com sucesso!'
            );


            fecharModal();


            await carregarIntegrantes();


        } catch (erro) {

            console.error(
                'Erro ao salvar:',
                erro
            );


            alert(
                'Erro ao salvar as alterações:\n' +
                erro.message
            );


        } finally {

            btnSalvar.disabled =
                false;


            btnSalvar.innerHTML = `
                <i class="fa-solid fa-check mr-2"></i>
                Salvar alterações
            `;

        }

    }
);


// =====================================================
// FECHAR MODAL
// =====================================================

btnFechar.addEventListener(
    'click',
    () => {

        fecharModal();

    }
);


btnFecharX.addEventListener(
    'click',
    () => {

        fecharModal();

    }
);


function fecharModal() {

    modal.classList.add(
        'hidden'
    );

    modal.classList.remove(
        'flex'
    );


    integranteAtual =
        null;


    dadosOriginais =
        {};

}


// =====================================================
// BUSCA
// =====================================================

busca.addEventListener(
    'input',
    () => {

        const termo =
            busca.value
                .toLowerCase()
                .trim();


        const resultado =
            todosIntegrantes.filter(
                integrante => {

                    const texto =
                        [

                            integrante.nome,
                            integrante.matricula,
                            integrante.grupo,
                            integrante.email,
                            integrante.funcao,
                            integrante.area,
                            integrante.turno

                        ]
                        .map(valor =>
                            String(
                                valor ?? ''
                            ).toLowerCase()
                        )
                        .join(' ');


                    return texto.includes(
                        termo
                    );

                }
            );


        renderizarTabela(
            resultado
        );

    }
);


// =====================================================
// NORMALIZAR VALORES
// =====================================================

function normalizarValor(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return '';

    }


    return String(valor).trim();

}


// =====================================================
// SEGURANÇA DO HTML
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