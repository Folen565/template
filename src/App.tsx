import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const API_KEY = 'e59e6fa3f80521a3a5e758f98d5616fe';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

interface Artist {
  name: string;
  listeners: string;
  image: { ['#text']: string }[];
}

interface Track {
  name: string;
  artist: { name: string };
  image: { ['#text']: string }[];
}

interface ArtistWithGenres extends Artist {
  genres: string[];
}

const getArtistGenres = async (artistName: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`);
    const data = await res.json();
    if (data.artist && data.artist.tags && data.artist.tags.tag) {
      return (data.artist.tags.tag as any[]).slice(0, 3).map(tag => tag.name);
    }
    return [];
  } catch {
    return [];
  }
};

const App: React.FC = () => {
  const [artists, setArtists] = useState<ArtistWithGenres[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [searchResultsArtists, setSearchResultsArtists] = useState<ArtistWithGenres[]>([]);
  const [searchResultsTracks, setSearchResultsTracks] = useState<Track[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const artistsRes = await fetch(`${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`);
        const artistsData = await artistsRes.json();
        const artistsRaw: Artist[] = artistsData.artists.artist;
        const artistsWithGenres: ArtistWithGenres[] = await Promise.all(
          artistsRaw.map(async (artist) => ({
            ...artist,
            genres: await getArtistGenres(artist.name),
          }))
        );
        setArtists(artistsWithGenres);
        const tracksRes = await fetch(`${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10`);
        const tracksData = await tracksRes.json();
        setTracks(tracksData.tracks.track);
      } catch (e) {
        setError('Ошибка загрузки данных. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSearch(inputValue);
    setSearchLoading(true);
    setSearchError(null);
    setSearchResultsArtists([]);
    setSearchResultsTracks([]);
    try {
      const artistsRes = await fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(inputValue)}&api_key=${API_KEY}&format=json&limit=5`);
      const artistsData = await artistsRes.json();
      const artistsRaw: Artist[] = artistsData.results.artistmatches.artist || [];
      const artistsWithGenres: ArtistWithGenres[] = await Promise.all(
        artistsRaw.map(async (artist) => ({
          ...artist,
          genres: await getArtistGenres(artist.name),
        }))
      );
      setSearchResultsArtists(artistsWithGenres);
      const tracksRes = await fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(inputValue)}&api_key=${API_KEY}&format=json&limit=5`);
      const tracksData = await tracksRes.json();
      setSearchResultsTracks(tracksData.results.trackmatches.track || []);
    } catch (e) {
      setSearchError('Ошибка поиска. Попробуйте позже.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="app">
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
        searchLoading={searchLoading}
      />
      <main className="main">
        <div className="container">
          <h1 className="heading">Music</h1>
          <section className="popular-section">
            <h2>Hot right now</h2>
            <div className="artists-grid">
              {searchLoading ? (
                <div>Поиск артистов...</div>
              ) : searchResultsArtists.length > 0 || (search && !searchLoading) ? (
                searchResultsArtists.length > 0 ? (
                  searchResultsArtists.map((artist: any) => (
                    <div className="artist-card" key={artist.name}>
                      <img className="artist-image" src={artist.image?.[2]?.['#text'] || artist.image?.[0]?.['#text'] || ''} alt={artist.name} />
                      <h3 className="artist-name">{artist.name}</h3>
                      <p className="artist-listeners">
                        {artist.genres && artist.genres.length > 0
                          ? artist.genres.join(', ')
                          : 'Жанры не найдены'}
                      </p>
                    </div>
                  ))
                ) : (
                  <div style={{height: "50px"}}>Ничего не найдено.</div>
                )
              ) : loading ? (
                <div style={{height: "50px"}}>Загрузка...</div>
              ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : (
                artists.map((artist) => (
                  <div className="artist-card" key={artist.name}>
                    <img className="artist-image" src={artist.image[2]['#text'] || artist.image[0]['#text']} alt={artist.name} />
                    <h3 className="artist-name">{artist.name}</h3>
                    <p className="artist-listeners">
                      {artist.genres && artist.genres.length > 0
                        ? artist.genres.join(', ')
                        : 'Жанры не найдены'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
          <section className="popular-section">
            <h2>Popular Tracks</h2>
            <div className="tracks-list">
              {searchLoading ? (
                <div>Поиск треков...</div>
              ) : searchResultsTracks.length > 0 || (search && !searchLoading) ? (
                searchResultsTracks.length > 0 ? (
                  searchResultsTracks.map((track: any, idx: number) => (
                    <div className="track-item" key={track.name + track.artist}>
                      <span className="track-position">{idx + 1}</span>
                      <img className="track-image" src={track.image?.[2]?.['#text'] || track.image?.[0]?.['#text'] || ''} alt={track.name} />
                      <div className="track-info">
                        <h3 className="track-name">{track.name}</h3>
                        <p className="track-artist">{track.artist}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Ничего не найдено.</div>
                )
              ) : loading ? (
                <div>Загрузка...</div>
              ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : (
                tracks.map((track, idx) => (
                  <div className="track-item" key={track.name + track.artist.name}>
                    <span className="track-position">{idx + 1}</span>
                    <img className="track-image" src={track.image[2]['#text'] || track.image[0]['#text']} alt={track.name} />
                    <div className="track-info">
                      <h3 className="track-name">{track.name}</h3>
                      <p className="track-artist">{track.artist.name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
