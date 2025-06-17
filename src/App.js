import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { motion, AnimatePresence } from 'framer-motion'; // For animation

const verses = [
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. - Philippians 4:6",
    "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
    "Trust in the Lord with all your heart, and do not lean on your own understanding. - Proverbs 3:5",
    "I can do all things through him who strengthens me. - Philippians 4:13",
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you. - Deuteronomy 31:6",
    "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28",
    "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint. - Isaiah 40:31",
    "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you. - Ephesians 4:32",
    "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you. - 1 Thessalonians 5:16-18",
    "Commit your work to the Lord, and your plans will be established. - Proverbs 16:3",
    "For God gave us a spirit not of fear but of power and love and self-control. - 2 Timothy 1:7",
    "Blessed is the man who remains steadfast under trial, for when he has stood the test he will receive the crown of life, which God has promised to those who love him. - James 1:12",
    "And let us not grow weary of doing good, for in due season we will reap, if we do not give up. - Galatians 6:9",
    "But seek first the kingdom of God and his righteousness, and all these things will be added to you. - Matthew 6:33",
    "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord. - Romans 8:38-39",
    "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. - Galatians 6:9",
    "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come. - 2 Corinthians 5:17",
    "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7",
    "And whatever you ask in prayer, you will receive, if you have faith.- Matthew 21:22",
    "But you are a chosen race, a royal priesthood, a holy nation, a people for his own possession, that you may proclaim the excellencies of him who called you out of darkness into his marvelous light. - 1 Peter 2:9",    "Do not be overcome by evil, but overcome evil with good. - Romans 12:21",
    "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law. - Galatians 5:22-23",
    "For we walk by faith, not by sight. - 2 Corinthians 5:7",
    "But thanks be to God, who gives us the victory through our Lord Jesus Christ. - 1 Corinthians 15:57",
    "The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid? - Psalm 27:1",
    "I have said these things to you, that in me you may have peace. In the world you will have tribulation. But take heart; I have overcome the world. - John 16:33",
    "But as for you, be strong and do not give up, for your work will be rewarded. - 2 Chronicles 15:7",
    "Therefore, encourage one another and build one another up, just as you are doing. - 1 Thessalonians 5:11",
    "The Lord is near to the brokenhearted and saves the crushed in spirit. - Psalm 34:18",
    "In all your ways acknowledge him, and he will make straight your paths. - Proverbs 3:6",
    "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart. - Hebrews 4:12",
    "And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful. - Colossians 3:15",
    "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away. - Revelation 21:4",
    "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord. - Romans 6:23",
    "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord. - Romans 8:38-39",
    "And we know that for those who love God all things work together for good, for those who are called according to his purpose. - Romans 8:28",
    "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing. - Zephaniah 3:17",
    "This is the day that the Lord has made; let us rejoice and be glad in it. - Psalm 118:24",
    "I praise you, for I am fearfully and wonderfully made. Wonderful are your works; my soul knows it very well. - Psalm 139:14",
    "A joyful heart is good medicine, but a crushed spirit dries up the bones. - Proverbs 17:22",
    "And we have something more sure, the prophetic word, to which you will do well to pay attention as to a lamp shining in a dark place, until the day dawns and the morning star rises in your hearts. - 2 Peter 1:19",
    "But God shows his love for us in that while we were still sinners, Christ died for us. - Romans 5:8",
    "Let the words of my mouth and the meditation of my heart be acceptable in your sight, O Lord, my rock and my redeemer. - Psalm 19:14",
    "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. - John 3:16",
    "The Lord is merciful and gracious, slow to anger and abounding in steadfast love. - Psalm 103:8",
    "But you, O Lord, are a God merciful and gracious, slow to anger and abounding in steadfast love and faithfulness. - Psalm 86:15",
    "For the Lord is good; his steadfast love endures forever, and his faithfulness to all generations. - Psalm 100:5",
    "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him. - Hebrews 11:6",
    "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore, I will boast all the more gladly of my weaknesses, so that the power of Christ may rest upon me. - 2 Corinthians 12:9"
];

// Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const RandomVerseGenerator = () => {
  const [shuffledVerses, setShuffledVerses] = useState([]);
  const [verseIndex, setVerseIndex] = useState(0);
  const [verse, setVerse] = useState('');

  // Shuffle verses on mount
  useEffect(() => {
    const newVerses = shuffleArray(verses);
    setShuffledVerses(newVerses);
    setVerse(newVerses[0]);
    setVerseIndex(1);
  }, []);

  const generateNewVerse = () => {
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

  return (
    <div className="container">
      <div className="verse-box">
        <h1 className="title grad">Verse of Hope</h1>
        <div className="verse-text">
          <AnimatePresence mode="wait">
            <motion.p
              key={verse}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {verse}
            </motion.p>
          </AnimatePresence>
        </div>
        <Button className="button mt-3" variant="primary" onClick={generateNewVerse}>
          Generate Verse
        </Button>
      </div>
    </div>
  );
};

export default RandomVerseGenerator;
