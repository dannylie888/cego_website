import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Collections from '@/components/sections/Collections';
import Catalog from '@/components/sections/Catalog';
import WhyCego from '@/components/sections/WhyCego';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Collections />
      <Catalog />
      <WhyCego />
      <Contact />
    </>
  );
}
