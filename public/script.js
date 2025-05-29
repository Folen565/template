const API_KEY = 'e59e6fa3f80521a3a5e758f98d5616fe';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

document.addEventListener('DOMContentLoaded', () => {
    // Загрузка популярных исполнителей
    loadPopularArtists();
    
    // Загрузка популярных треков
    loadPopularTracks();
    
    // Настройка поиска
    setupSearch();
});

/**
 * Загружает популярных исполнителей
 */
async function loadPopularArtists() {
    try {
        const response = await fetch(`${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`);
        const data = await response.json();
        
        const artistsGrid = document.querySelector('.artists-grid');
        artistsGrid.innerHTML = '';
        
        data.artists.artist.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            artistCard.innerHTML = `
                <img src="${artist.image[2]['#text']}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>${Number(artist.listeners).toLocaleString()} listeners</p>
            `;
            artistsGrid.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading popular artists:', error);
        alert('Failed to load popular artists. Please try again later.');
    }
}

/**
 * Загружает популярные треки
 */
async function loadPopularTracks() {
    try {
        const response = await fetch(`${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10`);
        const data = await response.json();
        
        const tracksList = document.querySelector('.tracks-list');
        tracksList.innerHTML = '';
        
        data.tracks.track.forEach((track, index) => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.innerHTML = `
                <span class="position">${index + 1}</span>
                <img src="${track.image[2]['#text']}" alt="${track.name}">
                <div class="track-info">
                    <h3>${track.name}</h3>
                    <p>${track.artist.name}</p>
                </div>
            `;
            tracksList.appendChild(trackItem);
        });
    } catch (error) {
        console.error('Error loading popular tracks:', error);
        alert('Failed to load popular tracks. Please try again later.');
    }
}

/**
 * Настраивает обработчик поиска
 */
function setupSearch() {
    const searchForm = document.querySelector('.search-box');
    const searchInput = searchForm.querySelector('input');
    
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query) {
            try {
                // Поиск исполнителей
                const artistsResponse = await fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=5`);
                const artistsData = await artistsResponse.json();
                
                // Поиск треков
                const tracksResponse = await fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=5`);
                const tracksData = await tracksResponse.json();
                
                // Отображение результатов поиска
                displaySearchResults(artistsData.results.artistmatches.artist, tracksData.results.trackmatches.track);
            } catch (error) {
                console.error('Search error:', error);
                alert('Search failed. Please try again later.');
            }
        }
    });
}

/**
 * Отображает результаты поиска
 */
function displaySearchResults(artists, tracks) {
    // Здесь можно реализовать отображение результатов поиска
    console.log('Artists:', artists);
    console.log('Tracks:', tracks);
    alert(`Found ${artists.length} artists and ${tracks.length} tracks matching your search.`);
}