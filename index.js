const handleSearch = async (event) => {
  event.preventDefault();

  const mensagem = document.querySelector('#message');
  mensagem.innerHTML = 'Carregando...';

  const Lista = document.querySelector('#shows');
  Lista.innerHTML = '';

  const busca = document.querySelector('#query');
  const TextoASerBuscado = busca.Value;

  const url = `https://api.tvmaze.com/search/shows?q=${TextoASerBuscado}`;

  const resposta = await fetch(url);
  const programas = await resposta.json();

  if (programas.length === 0) {
    mensagem.innerHTML = 'Resultado não encontrado.';
    return;
  }

  mensagem.innerHTML = '';

  programas.forEach((programa) => {
    const titulo = programa?.show?.name || '';
    const imagem = programa?.image?.medium || '';

    Lista.insertAdjacentHTML(
      'beforeend',
      `<li>
    <img class="poster" src="${imagem}">
    <span class="show-name">${titulo}</span>
    </li>`
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
