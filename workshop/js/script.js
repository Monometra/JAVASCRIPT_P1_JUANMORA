let allCharacters = [];
//fetch api
fetch('https://rickandmortyapi.com/api/character/?name=Sanchez')
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data.results; //all characters by once
    renderCharacters(allCharacters); //render
  })
  .catch((error) => {
    console.error('Error fetching characters:', error);
  });

//list
function renderCharacters(characters) {
  const container = document.getElementById('characters');
  if (!container) {
    console.error('Element with id "characters" not found');
    return;
  }

  container.innerHTML = ''; // clear

  characters.forEach((character) => {
    const div = document.createElement('div');
    div.className = 'character-card';
    div.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <div class="status">Status: ${character.status}</div>
    `;
    container.appendChild(div);
  });
}

// Filter
function filterCharactersByName(query) {
  const normalizedQuery = query.trim().toLowerCase();

  // filter by name
  const filtered = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(normalizedQuery)
  );

  renderCharacters(filtered);
}

// id element search for searching
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    filterCharactersByName(event.target.value);
  });
}