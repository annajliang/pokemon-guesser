import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import startGame from '../public/sounds/startGame.mp3';

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setStartGameAudio(new Audio(startGame));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Who&apos;s that Pokemon?</h1>
      <p>
        It’s a race against the clock to correctly guess which one of the first
        generation 151 Pokemon is behind the mysterious dark silhouette!
      </p>
      <p>
        Earn a high score to enter the leaderboard and rank with the rest of the
        Pokemon Elites.
      </p>
      <p>Time starts once you click the start button!</p>
      <Link href="/game">
        <a onClick={() => startGameAudio?.play()}>Start</a>
      </Link>
    </div>
  );
};

export default Home;
