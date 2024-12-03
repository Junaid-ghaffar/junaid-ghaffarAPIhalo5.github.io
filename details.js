const API_URL = 'https://www.haloapi.com/metadata/h5/metadata/enemies';
const SUBSCRIPTION_KEY = '8d903eb0ea2445e5beb0ede1d5c552f2';
const enemyDetailsDiv = document.getElementById('enemy-details');

// Get enemy ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const enemyId = urlParams.get('id');

async function fetchEnemyDetails() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept-Language': 'en',
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
      },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const enemies = await response.json();
    const enemy = enemies.find(e => e.id === enemyId);
    if (!enemy) throw new Error('Enemy not found');
    displayEnemyDetails(enemy);
  } catch (error) {
    console.error('Error fetching enemy details:', error);
    enemyDetailsDiv.innerHTML = `<p class="text-danger">Failed to load enemy details.</p>`;
  }
}

function displayEnemyDetails(enemy) {
  enemyDetailsDiv.innerHTML = `
    <div class="card">
      <img src="${enemy.imageUrl}" class="card-img-top" alt="${enemy.name}">
      <div class="card-body">
        <h5 class="card-title">${enemy.name}</h5>
        <p class="card-text">${enemy.description || 'No description available.'}</p>
        <ul>
          <li><strong>Faction:</strong> ${enemy.faction || 'Unknown'}</li>
          <li><strong>Type:</strong> ${enemy.type || 'Unknown'}</li>
        </ul>
      </div>
    </div>
  `;
}

fetchEnemyDetails();
