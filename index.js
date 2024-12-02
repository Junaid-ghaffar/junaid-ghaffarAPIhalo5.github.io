const API_URL = 'https://www.haloapi.com/metadata/h5/metadata/enemies';
const SUBSCRIPTION_KEY = '8d903eb0ea2445e5beb0ede1d5c552f2';
const enemyListDiv = document.getElementById('enemy-list');

async function fetchEnemies() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept-Language': 'en',
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
      },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const enemies = await response.json();
    displayEnemies(enemies);
  } catch (error) {
    console.error('Error fetching enemies:', error);
    enemyListDiv.innerHTML = `<p class="text-danger">Failed to load enemies. Try again later.</p>`;
  }
}

function displayEnemies(enemies) {
  enemyListDiv.innerHTML = enemies
    .map(enemy => `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${enemy.imageUrl}" class="card-img-top" alt="${enemy.name}">
          <div class="card-body">
            <h5 class="card-title">${enemy.name}</h5>
            <p class="card-text">${enemy.description || 'No description available.'}</p>
            <a href="details.html?id=${enemy.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    `)
    .join('');
}

fetchEnemies();
