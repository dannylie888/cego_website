import Hero from '@/components/sections/Hero';
import BrandIntro from '@/components/sections/BrandIntro';
import CollectionsPreview from '@/components/sections/CollectionsPreview';
import CatalogPreview from '@/components/sections/CatalogPreview';
import WhyCego from '@/components/sections/WhyCego';
import CustomOEMTeaser from '@/components/sections/CustomOEMTeaser';
import SocialProof from '@/components/sections/SocialProof';
import ContactCTA from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <CollectionsPreview />
      <CatalogPreview />
      <WhyCego />
      <CustomOEMTeaser />
      <SocialProof />
      <ContactCTA />
    </>
  );
}
