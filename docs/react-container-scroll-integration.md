# React Container Scroll Integration

This repository is currently a SwiftPM macOS app with a static HTML/CSS/JS website in `docs/`.
It is not yet a React, Tailwind CSS, TypeScript, or shadcn/ui project.

Current project scan:

- `package.json`: not present
- `tsconfig.json`: not present
- `components.json`: not present
- `tailwind.config.*`: not present
- shadcn project context: `framework: Manual`, `typescript: false`, `tailwindVersion: null`

## Added Source Files

The component source has been staged in the standard shadcn path:

- `components/ui/container-scroll-animation.tsx`
- `components/ui/demo.tsx`

The default shadcn component path should be `components/ui`. Keeping UI primitives there matters because registry components, examples, and imports such as `@/components/ui/button` assume a stable UI component root. If a future app uses a different path, configure `components.json` aliases and rewrite imports consistently.

## Dependencies

Install this after a React app exists:

```bash
npm install framer-motion
```

The demo uses `next/image`, so it assumes a Next.js app. It also uses an Unsplash image:

```txt
https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80
```

For Next.js, allow Unsplash in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

## Recommended Setup

Create a Next.js + TypeScript + Tailwind app, then initialize shadcn/ui:

```bash
npx create-next-app@latest coolboard-web --typescript --tailwind --eslint --app --src-dir false
cd coolboard-web
npx shadcn@latest init
npm install framer-motion
mkdir -p components/ui
```

Then copy:

```bash
cp ../components/ui/container-scroll-animation.tsx components/ui/container-scroll-animation.tsx
cp ../components/ui/demo.tsx components/ui/demo.tsx
```

Use it in a Next app route:

```tsx
import { HeroScrollDemo } from "@/components/ui/demo";

export default function Page() {
  return <HeroScrollDemo />;
}
```

## Component Notes

- Props: `ContainerScroll` accepts `titleComponent` and `children`.
- State: it tracks mobile width via `window.innerWidth <= 768`.
- Hooks: `useScroll` and `useTransform` from `framer-motion`.
- Context providers: none required.
- Responsive behavior: mobile scales the card from `0.7` to `0.9`; desktop scales from `1.05` to `1`.
- Best placement: a React marketing/landing route for the web download page, not the current static `docs/index.html` unless the site is migrated to React.
