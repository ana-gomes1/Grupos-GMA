const temas = {
    light: {
        primary: '#1769D1',
        sidebar: '#102A4C',
        background: '#F5F9FD'
    },

    dark: {
        primary: '#3B82F6',
        sidebar: '#0B1B30',
        background: '#0F172A'
    }
};


function aplicarTema(tema) {
    const cores = temas[tema];

    if (!cores) return;

    document.documentElement.style.setProperty(
        '--primary',
        cores.primary
    );

    document.documentElement.style.setProperty(
        '--sidebar',
        cores.sidebar
    );

    document.documentElement.style.setProperty(
        '--background',
        cores.background
    );

    localStorage.setItem('igrupos_tema', tema);
}

const temaSalvo = localStorage.getItem('igrupos_tema') || 'light';

aplicarTema(temaSalvo);


document.addEventListener('DOMContentLoaded', () => {

    const temaSelect = document.getElementById('temaSelect');

    if (!temaSelect) return;

    temaSelect.value = temaSalvo;

    temaSelect.addEventListener('change', () => {
        aplicarTema(temaSelect.value);
    });

});