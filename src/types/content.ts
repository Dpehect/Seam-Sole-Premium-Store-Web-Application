export type HomeStat = {
  value: string;
  label: string;
};

export type HomeHotspot = {
  slug: string;
  x: string;
  y: string;
  label: string;
};

export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    footerDescription: string;
    footerStatus: string;
  };
  home: {
    hero: {
      badges: string[];
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      primaryImage: string;
      primaryImageAlt: string;
      secondaryImage: string;
      secondaryImageAlt: string;
      dropBadge: string;
      floatingLabel: string;
      floatingText: string;
      stats: HomeStat[];
    };
    marquee: string[];
    runway: {
      kicker: string;
      title: string;
      description: string;
      productSlugs: string[];
    };
    categoryShowcase: {
      kicker: string;
      title: string;
      cta: string;
    };
    productRails: {
      featuredKicker: string;
      featuredTitle: string;
      newKicker: string;
      newTitle: string;
      cta: string;
    };
    shopTheLook: {
      kicker: string;
      title: string;
      image: string;
      imageAlt: string;
      description: string;
      helperTitle: string;
      helperText: string;
      hotspots: HomeHotspot[];
    };
    editorial: {
      kicker: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      cta: string;
    };
    threeFeature: {
      kicker: string;
      title: string;
      description: string;
      cta: string;
    };
    finalPolish: {
      badge: string;
      title: string;
      description: string;
      cta: string;
      cards: Array<{ title: string; text: string }>;
    };
    brandSignature: {
      kicker: string;
      title: string;
      points: string[];
      cta: string;
    };
  };
};
