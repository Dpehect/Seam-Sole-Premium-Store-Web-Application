# Seam & Sole Storefront

This is a premium e-commerce storefront I built to showcase modern React patterns, interactive 3D elements, and clean, production-ready user experiences. The goal was to create a highly polished fashion boutique that runs fast, looks premium, and prioritizes smooth visual details like micro-interactions and transitions.

## Key Features & Highlights

### 3D Interactive Sneaker Orbit
I integrated React Three Fiber (R3F) and Drei to build a responsive 3D showcase component. Users can rotate, zoom, and inspect a 3D product model directly in the browser. It is fully integrated with the UI state to change models based on active product lanes, offering an interactive retail experience.

### Responsive Hover State Tricks
In fashion e-commerce, showing different angles or fabric details on hover is critical for conversion. Instead of quadrupling the image assets on the server, I utilized dynamic parameters from the Unsplash CDN:
*   **Sneakers:** When hovered, the image mirrors horizontally (`&flip=h`), showing the shoe facing the other direction to provide a simulated secondary angle.
*   **Apparel:** Graphic tees and hoodies apply a close-up focal crop (`&crop=focalpoint&fp-z=1.4`) to showcase logo details or fabric stitching without reversing text like mirroring would.

### Interactive Recommendation Quiz
I built a step-by-step fit quiz that maps user choices to specific tags and categories in the product database, dynamically recommending matched shoes or tees from the catalog.

### Performance & Page Speed
All product catalog details are pre-rendered into static pages during the build process, ensuring fast load times and optimized SEO structure.

## Core Tech Decisions

*   **Next.js 14 (App Router):** Leveraged Next.js layout features, file-system routing, and built-in image optimization.
*   **Tailwind CSS:** Used utility classes to establish a customized dark mode theme, glassmorphic panels, and consistent layout grids.
*   **GSAP & Framer Motion:** Combined these two libraries to manage layout transitions, fade-in loading, and hover state animations.
*   **Context API:** Handled global state for the shopping cart and user wishlist to keep user experience fast and reactive without heavy state-management boilerplate.
