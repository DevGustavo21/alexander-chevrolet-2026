import About from './components/About';
import Community from './components/Community';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Lineup from './components/Lineup';
import News from './components/News';
import Service from './components/Service';

export default function HomePage() {
  return (
    <div className="page">
      <Hero />
      <About />
      <Lineup />
      <Experience />
      <Service />
      {/* <News /> */}
      <Community />
      <Footer />
    </div>
  );
}
