import { Hero } from '@/components/home/hero';
import { Marquee } from '@/components/animations/marquee';
import { DropShowcase } from '@/components/home/drop-showcase';
import { ProductRail } from '@/components/home/product-rail';
import { EditorialStrip } from '@/components/home/editorial-strip';
import { ThreeFeature } from '@/components/home/three-feature';
import { RunwayPicks } from '@/components/home/runway-picks';
import { ShopTheLook } from '@/components/home/shop-the-look';
import { BrandSignature } from '@/components/home/brand-signature';
import { FinalPolish } from '@/components/home/final-polish';
import { siteContent } from '@/lib/site-content';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={siteContent.home.marquee} />
      <RunwayPicks />
      <DropShowcase />
      <ProductRail type="featured" />
      <ShopTheLook />
      <EditorialStrip />
      <ProductRail type="new" />
      <ThreeFeature />
      <FinalPolish />
      <BrandSignature />
    </>
  );
}
