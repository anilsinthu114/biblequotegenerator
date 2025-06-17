import { AnimatePresence, motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';

const VerseBox = ({
  verse,
  translatedVerse,
  reference,
  language,
  onSpeak,
  onStop,
  isSpeaking,
  darkMode,
}) => (
  <div>
    <div
      className='verse-text mb-3'
      style={{
        minHeight: '100px',
        fontSize: '1.25rem',
        padding: '20px',
        fontStyle: 'italic',
      }}
    >
      <AnimatePresence mode='wait'>
        <motion.p
          key={translatedVerse}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          "{translatedVerse}"
        </motion.p>
      </AnimatePresence>
    </div>
    <div
      className={`text-end fst-italic fw-semibold mb-3 ${darkMode ? 'text-white' : 'text-white'}`}
    >
      — {reference}
    </div>
    <Button
      variant={darkMode ? 'outline-info' : 'info'}
      onClick={isSpeaking ? onStop : onSpeak}
      className='px-4 py-2 mb-4'
      style={{
        borderRadius: '25px',
        fontWeight: 'bold',
        background: isSpeaking ? '#dc3545' : 'linear-gradient(to right, #00c6ff, #0072ff)',
        border: 'none',
        color: isSpeaking ? '#fff' : '#fff',
        fontSize: '1.1rem',
        boxShadow: isSpeaking ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {isSpeaking ? '🔇 Stop' : '🔊 Speak'}
    </Button>
  </div>
);

export default VerseBox;
