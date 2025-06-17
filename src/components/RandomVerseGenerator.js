import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import verses from '../data/verses.json';
import VerseBox from './VerseBox';

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const RandomVerseGenerator = ({ darkMode, toggleDarkMode }) => {
  const [shuffledVerses, setShuffledVerses] = useState([]);
  const [verseIndex, setVerseIndex] = useState(0);
  const [verse, setVerse] = useState('');
  const [translatedVerse, setTranslatedVerse] = useState('');
  const [language, setLanguage] = useState('en');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const newVerses = shuffleArray(verses);
    setShuffledVerses(newVerses);
    setVerse(newVerses[0]);
    setVerseIndex(1);
  }, []);

  useEffect(() => {
    if (verse) translateVerse(getVerseText(verse));
  }, [verse, language]);

  const getVerseText = (v) => v.split(' - ')[0] || '';
  const getReference = (v) => v.split(' - ')[1] || '';

  const translateVerse = async (text) => {
    if (language === 'en') {
      setTranslatedVerse(text);
      return;
    }
    try {
      const res = await axios.post('https://translate.argosopentech.com/translate', {
        q: text,
        source: 'en',
        target: language,
        format: 'text',
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTranslatedVerse(res.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedVerse(text);
    }
  };

  const generateNewVerse = () => {
    stopSpeaking();
    if (verseIndex >= shuffledVerses.length) {
      const reshuffled = shuffleArray(verses);
      setShuffledVerses(reshuffled);
      setVerse(reshuffled[0]);
      setVerseIndex(1);
    } else {
      setVerse(shuffledVerses[verseIndex]);
      setVerseIndex((prev) => prev + 1);
    }
  };

  const addToFavorites = () => {
    if (!verse || typeof verse !== 'string') return;

    const isDuplicate = favorites.some(fav => fav.trim() === verse.trim());
    if (isDuplicate) {
      Swal.fire({
        title: 'Already Saved!',
        text: 'This verse is already in your favorites.',
        icon: 'info',
        timer: 1200,
        showConfirmButton: false,
        position: 'center',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          content: 'swal-content',
        },
      });
      return;
    }

    const updated = [...favorites, verse.trim()];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));

    Swal.fire({
      title: 'Success!',
      text: 'Verse added to favorites',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'center',
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
        content: 'swal-content',
      },
    });
  };

  const speakVerse = () => {
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(translatedVerse);
    utterance.lang = language;
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
    utteranceRef.current = utterance;
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  const text = getVerseText(verse);
  const reference = getReference(verse);

  return (
    <div className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
      <div className={`verse-box p-5 rounded-4 shadow-lg text-center ${darkMode ? 'bg-secondary' : 'bg-white'}`} style={{ maxWidth: '700px', width: '90%' }}>
        <h1 className='title mb-4' style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', fontSize: '2.5rem' }}>
          Verse of Hope
        </h1>

        <VerseBox
          verse={text}
          translatedVerse={translatedVerse}
          reference={reference}
          language={language}
          onSpeak={speakVerse}
          onStop={stopSpeaking}
          isSpeaking={isSpeaking}
          darkMode={darkMode}
        />

        <div className='d-flex justify-content-center flex-wrap gap-4 mb-5'>
          <Button variant='outline-primary' onClick={addToFavorites} aria-label='Add to favorites'>❤️</Button>
          <Button
            variant={darkMode ? 'light' : 'dark'}
            onClick={toggleDarkMode}
            style={{ color: darkMode ? '#000' : '#000', backgroundColor: darkMode ? '#f8f9fa' : '#212529', border: 'none', borderRadius: '25px', fontWeight: 'bold' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </Button>
          <Link to='/favorites'>
            <Button variant='success'>View Favorites</Button>
          </Link>
        </div>

        <Button className='px-4 py-2' variant='primary' onClick={generateNewVerse} style={{ borderRadius: '25px', fontWeight: 'bold', background: 'linear-gradient(to right, #00c6ff, #0072ff)', border: 'none' }}>
          Generate Verse
        </Button>
      </div>
    </div>
  );
};

export default RandomVerseGenerator;