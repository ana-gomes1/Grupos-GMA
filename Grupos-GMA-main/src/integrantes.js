const URL_API = 'COLE_AQUI_A_URL_DO_SEU_WEB_APP';

const modal = document.getElementById('modalIntegrante');
const form = document.getElementById('formIntegrante');

const btnEditar = document.getElementById('btnEditar');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelarEdicao');
const btnFechar = document.getElementById('btnFecharModal');
const btnFecharX = document.getElementById('fecharModal');

const tabela = document.getElementById('tabelaIntegrantes');
const busca = document.getElementById('buscarIntegrante');


let integranteAtual = null;
let dadosOriginais = {};


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


document.addEventListener('DOMContentLoaded', () => {

    carregarIntegrantes();

});


async function carregarIntegrantes() {

    try {

        tabela.innerHTML = `
            <tr>
                <td colspan="8" class="px-5 py-8 text-center text-slate-500">
                    Carregando integrantes...
                </td>
            </tr>
        `;

        const resposta = await fetch(
            `${URL_API}?acao=buscarIntegrantes`
        );

        const integrantes = await resposta.json();

        if (!Array.isArray(integrantes)) {

            throw new Error(
                integrantes.mensagem || 'Erro ao buscar integrantes.'
            );

        }

        renderizarTabela(integrantes);

    } catch (erro) {

        console.error(erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="8" class="px-5 py-8 text-center text-red-500">
                    Erro ao carregar integrantes.
                </td>
            </tr>
        `;

    }

}


function renderizarTabela(integrantes) {

    tabela.innerHTML = '';

    if (integrantes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="8" class="px-5 py-8 text-center text-slate-500">
                    Nenhum integrante encontrado.
                </td>
            </tr>
        `;

        return;
    }


    integrantes.forEach(integrante => {

        const tr = document.createElement('tr');

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
                           hover:bg-slate-100 text-slate-500">

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </td>
        `;


        tr.addEventListener('click', () => {

            abrirModal(integrante);

        });


        tabela.appendChild(tr);

    });

}


function abrirModal(integrante) {

    integranteAtual = { ...integrante };

    dadosOriginais = {};

    campos.forEach(campo => {

        dadosOriginais[campo] =
            normalizarValor(integrante[campo]);

    });



    campos.forEach(campo => {

        const elemento = document.querySelector(
            `[name="${campo}"]`
        );

        if (elemento) {

            elemento.value =
                integrante[campo] ?? '';

        }

    });


    document.getElementById('modalNome').textContent =
        integrante.nome || 'Integrante';

    document.getElementById('modalGrupo').textContent =
        integrante.grupo || '';


    const foto = document.getElementById('modalFoto');

    if (integrante.foto) {

        foto.src = integrante.foto;

    } else {

        foto.src =
            'https://ui-avatars.com/api/?name=' +
            encodeURIComponent(integrante.nome || 'Integrante') +
            '&background=random&color=fff';

    }


    sairModoEdicao();

    modal.classList.remove('hidden');
    modal.classList.add('flex');

}

btnEditar.addEventListener('click', () => {

    entrarModoEdicao();

});


function entrarModoEdicao() {

    campos.forEach(campo => {

        const elemento = document.querySelector(
            `[name="${campo}"]`
        );

        if (elemento) {

            elemento.disabled = false;

            elemento.classList.remove('bg-slate-50');

            elemento.classList.add('bg-white');

        }

    });


    btnEditar.classList.add('hidden');
    btnSalvar.classList.remove('hidden');
    btnCancelar.classList.remove('hidden');

    btnFechar.classList.add('hidden');

}

btnCancelar.addEventListener('click', () => {

    campos.forEach(campo => {

        const elemento = document.querySelector(
            `[name="${campo}"]`
        );

        if (elemento) {

            elemento.value =
                dadosOriginais[campo] ?? '';

        }

    });


    sairModoEdicao();

});


function sairModoEdicao() {

    campos.forEach(campo => {

        const elemento = document.querySelector(
            `[name="${campo}"]`
        );

        if (elemento) {

            elemento.disabled = true;

            elemento.classList.remove('bg-white');

            elemento.classList.add('bg-slate-50');

        }

    });


    btnEditar.classList.remove('hidden');
    btnSalvar.classList.add('hidden');
    btnCancelar.classList.add('hidden');

    btnFechar.classList.remove('hidden');

}

  
form.addEventListener('submit', async (event) => {

    event.preventDefault();


    const alteracoes = {};


    campos.forEach(campo => {

        const elemento = document.querySelector(
            `[name="${campo}"]`
        );

        if (!elemento) {
            return;
        }


        const valorAtual =
            normalizarValor(elemento.value);

        const valorOriginal =
            normalizarValor(dadosOriginais[campo]);


        if (valorAtual !== valorOriginal) {

            alteracoes[campo] =
                elemento.value.trim();

        }

    });


    // Nenhuma alteração

    if (Object.keys(alteracoes).length === 0) {

        alert('Nenhuma alteração foi realizada.');

        return;

    }


    // Desabilita botão enquanto salva

    btnSalvar.disabled = true;

    btnSalvar.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin mr-2"></i>
        Salvando...
    `;


    try {

        const resposta = await fetch(URL_API, {

            method: 'POST',

            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },

            body: JSON.stringify({

                acao: 'atualizarIntegrante',

                id: integranteAtual.id,

                alteracoes: alteracoes

            })

        });


        const resultado = await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                'Não foi possível atualizar o integrante.'
            );

        }


        alert('Integrante atualizado com sucesso!');


        fecharModal();

        carregarIntegrantes();


    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao salvar as alterações:\n' +
            erro.message
        );

    } finally {

        btnSalvar.disabled = false;

        btnSalvar.innerHTML = `
            <i class="fa-solid fa-check mr-2"></i>
            Salvar alterações
        `;

    }

});


// =====================================================
// FECHAR MODAL
// =====================================================

btnFechar.addEventListener('click', () => {

    fecharModal();

});


btnFecharX.addEventListener('click', () => {

    fecharModal();

});


function fecharModal() {

    modal.classList.add('hidden');
    modal.classList.remove('flex');

    integranteAtual = null;
    dadosOriginais = {};

}


// =====================================================
// BUSCA
// =====================================================

busca.addEventListener('input', () => {

    const termo =
        busca.value.toLowerCase().trim();

    const linhas =
        tabela.querySelectorAll('tr');


    linhas.forEach(linha => {

        const texto =
            linha.textContent.toLowerCase();

        if (texto.includes(termo)) {

            linha.style.display = '';

        } else {

            linha.style.display = 'none';

        }

    });

});


// =====================================================
// NORMALIZAR VALORES
// =====================================================

function normalizarValor(valor) {

    if (valor === null || valor === undefined) {

        return '';

    }

    return String(valor).trim();

}


// =====================================================
// SEGURANÇA DO HTML
// =====================================================

function escaparHTML(valor) {

    if (valor === null || valor === undefined) {

        return '';

    }

    return String(valor)

        .replace(/&/g, '&amp;')

        .replace(/</g, '&lt;')

        .replace(/>/g, '&gt;')

        .replace(/"/g, '&quot;')

        .replace(/'/g, '&#039;');

}