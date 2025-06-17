import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (verseToRemove) => {
    const updatedFavorites = favorites.filter((fav) => fav !== verseToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    Swal.fire({
  title: 'Deleted!',
  text: 'This verse has been deleted from favorites.',
  icon: 'info', // Or 'warning' or 'error' based on your preference
  iconColor: '#dc3545',
  background: '#f8d7da',
  color: '#721c24',
  showCloseButton: true,
  showCancelButton: false,
  timerProgressBar: true,
  timer: 1200,
  showConfirmButton: false,
  position: 'center',
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    content: 'swal-content',
  },
});
};

  const filteredFavorites = favorites.filter((fav) =>
    fav.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='container py-5'>
      <h2
        className='text-center mb-4'
        style={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontSize: '2.5rem',
        }}
      >
        💖 Favorite Verses
      </h2>

      {favorites.length > 0 && (
        <div className='mb-4 text-center'>
          <input
            type='search'
            className='form-control w-100 w-md-75 mx-auto shadow-sm rounded-3'
            placeholder='🔍 Search your favorites...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '600px' }}
          />
          <small className='text-muted d-block mt-2'>
            {searchTerm &&
              `${filteredFavorites.length} match${filteredFavorites.length !== 1 ? 'es' : ''} found`}
          </small>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className='text-center p-5 bg-light rounded-4 shadow-sm'>
          <h3>No Saved Verses Yet</h3>
          <p className='text-muted'>
            Your favorite verses will appear here once you save them.
          </p>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className='text-center p-4'>
          <p className='text-muted'>No matches found for "{searchTerm}".</p>
        </div>
      ) : (
        <div className='row g-4'>
          <AnimatePresence>
            {filteredFavorites.map((fav, index) => {
              const [text, reference] = fav.split(' - ');
              return (
                <motion.div
                  className='col-md-18 col-lg-0 col-xl-0'
                  style={{ minWidth: '250px' }}
                  layout
                  // whileHover={{ scale: 1.02 }}
                  // whileTap={{ scale: 0.98 }}
                  key={`${text}-${reference}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='card h-100 shadow-sm border-0 rounded-4 bg-white'>
                    <div className='card-body text-center p-4 position-relative'>
                      <p
                        className='card-text mb-3'
                        style={{ fontSize: '1.1rem', fontStyle: 'italic' }}
                      >
                        “{text}”
                      </p>
                      <p className='card-subtitle text-muted'>— {reference}</p>

                      <button
                        className='btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1'
                        onClick={() => removeFavorite(fav)}
                        title='Remove from favorites'
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <div className='text-center mt-5'>
        <Link to='/'>
          <Button
            variant='primary'
            size='lg'
            className='px-4 py-2 shadow'
            style={{
              borderRadius: '30px',
              background: 'linear-gradient(to right, #00c6ff, #0072ff)',
              border: 'none',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ⬅ Back to Generator
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FavoritesPage;
