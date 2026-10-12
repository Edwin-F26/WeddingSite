import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Invitation from './components/Invitation';
import Location from './components/Location';
import Schedule from './components/Schedule';
import DressCode from './components/DressCode';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import { ScrollTrigger } from './lib/gsap';

/**
 * sealed    – envelope on screen, page locked
 * revealing – intro is fading out while the invitation animates in beneath it
 * open      – intro unmounted, normal scrolling page
 */
export default function App() {
  const [stage, setStage] = useState('sealed');
  const opened = stage !== 'sealed';

  // Lock scrolling while the envelope is on screen.
  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened);
    if (opened) ScrollTrigger.refresh();
    return () => document.body.classList.remove('is-locked');
  }, [opened]);

  const handleReveal = useCallback(() => {
    window.scrollTo(0, 0);
    setStage('revealing');
  }, []);

  const handleDone = useCallback(() => setStage('open'), []);

  return (
    <>
      {stage !== 'open' && <Intro onReveal={handleReveal} onDone={handleDone} />}

      <div className={`site ${opened ? 'is-open' : ''}`} aria-hidden={!opened}>
        <Nav />
        <main>
          <Invitation active={opened} />
          <div id="details" className="details">
            <Location />
            <Schedule />
            <DressCode />
            <Rsvp />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
