import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  tags: string[];
  liveUrl: string;
  imagePath: string;
  color: string;
  featured: boolean;
  accentBadge: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  activeFilter = signal('all');

  readonly filters = [
    'all',
    'AI & Web Engineering',
    'Real Estate & Architecture',
    'Infrastructure & Contracting',
    'Luxury Digital Products',
  ];

  readonly projects: PortfolioProject[] = [
    {
      id: 'phoenix-colour',
      title: 'Phoenix Colour Technologies',
      client: 'Phoenix Colour Technologies LLC',
      location: 'Dubai, UAE (GCC & Africa)',
      category: 'AI & Web Engineering',
      tagline: 'Next-Gen Industrial Color Measurement & AI Waste Recovery Platform',
      description:
        'End-to-end design, modern web development, and custom AI tools engineering for the premier color measurement and print packaging technology provider across the UAE, Saudi Arabia, and Africa.',
      problem:
        'Over 200+ spectrophotometer models created decision paralysis for buyers without optical physics backgrounds; enterprise CFOs needed concrete proof of waste reduction to approve purchases.',
      solution:
        'Built a 3-step AI Substrate & Instrument Selector, a live Makeready Profit Recovery ROI Calculator (AED/USD), and a 24/7 technical AI assistant powered by Google Gemini Flash API.',
      highlights: [
        '3-Step Optical Substrate & Spectrophotometer Selector',
        'Live Makeready Scrap & Waste ROI Financial Calculator',
        '24/7 Google Gemini Flash Color Science Technical Assistant',
        'Mechanical Slot-Machine Digit Rolling Animations',
        'Cinematic 4-Slide Ken Burns Hero Presentation',
      ],
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Google Gemini AI', 'Vercel Edge'],
      liveUrl: 'https://phoenix-zeta-beige.vercel.app',
      imagePath: 'assets/images/project-phoenix.webp',
      color: 'from-amber-500/25 via-orange-500/20 to-electric-500/25',
      featured: true,
      accentBadge: 'Featured Enterprise Case Study',
    },
    {
      id: 'metro-ventures',
      title: 'Metro Ventures',
      client: 'Metro Ventures Infrastructure & Real Estate',
      location: 'Karnataka, India (Mysore, Bangalore, Mangalore)',
      category: 'Real Estate & Architecture',
      tagline: 'Architectural Brand Identity & Infrastructure Web Platform',
      description:
        'A luxury full-service digital web platform for a prominent real estate and construction firm in South India, featuring architectural gold branding and multi-division client hubs.',
      problem:
        'Needed to communicate three distinct enterprise divisions (Construction, Real Estate, and Legal Documentation) under one unified high-authority architectural brand.',
      solution:
        'Engineered an interactive Karnataka SVG map with live animated city pins, dedicated division landing pages, filterable project lightboxes, and direct WhatsApp and phone consultation.',
      highlights: [
        'Multi-Division Architecture (Real Estate, Construction & Legal)',
        'Interactive Karnataka SVG Map with Live City Pins',
        'Filterable Project Showcase with Lightbox Carousel',
        'Architectural Gold & Charcoal Visual Identity',
        'Zod-Validated Multi-Channel Consultation System',
      ],
      tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Zod'],
      liveUrl: 'https://metroventures.co',
      imagePath: 'assets/images/project-metroventures.png',
      color: 'from-yellow-600/25 via-amber-500/15 to-navy-950',
      featured: true,
      accentBadge: 'Real Estate & Construction Flagship',
    },
    {
      id: 'zayed-amer',
      title: 'Zayed Amer Contracting',
      client: 'Zayed Amer Contracting Establishment',
      location: 'Kingdom of Saudi Arabia',
      category: 'Infrastructure & Contracting',
      tagline: 'Enterprise Contracting & Saudi Vision 2030 Corporate Profile',
      description:
        'High-authority corporate digital presence and digital profile for an established contracting establishment in Saudi Arabia executing commercial and civil infrastructure.',
      problem:
        'Required an authoritative, compliance-verified web footprint reflecting alignment with Saudi Vision 2030, safety certifications, and commercial contracting capabilities.',
      solution:
        'Delivered an enterprise-grade digital company presence with industrial deep navy and high-vis orange color architecture, civil capability matrices, and digital brochure distribution.',
      highlights: [
        'Saudi Vision 2030 Strategic Alignment & Compliance',
        'Commercial & Civil Infrastructure Capability Matrix',
        'High-Contrast Industrial Navy & Orange Visual Hierarchy',
        'Automated Digital Brochure & PDF Distribution Pipeline',
        'Direct Government & B2B Contracting Inquiry Portals',
      ],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Saudi Vision 2030', 'Enterprise Portal'],
      liveUrl: 'https://www.zayedamer.com',
      imagePath: 'assets/images/project-zayedamer.png',
      color: 'from-orange-600/25 via-amber-600/15 to-navy-950',
      featured: false,
      accentBadge: 'Infrastructure & Vision 2030',
    },
    {
      id: 'webify-signature',
      title: 'Webify Signature — "Elena" Luxury Experience',
      client: 'Webify Signature Collection',
      location: 'Global (United States & Worldwide)',
      category: 'Luxury Digital Products',
      tagline: 'Bespoke Celebration Website & Interactive Memory Monument',
      description:
        'A luxury interactive celebration platform engineered as a permanent digital gift — featuring 101 interactive reasons, ambient soundtrack autoplay unblocker, and private vaults.',
      problem:
        'Physical cards and flowers wilt and get stored away; modern clients wanted an intimate, interactive, and permanent celebration universe accessible anywhere on mobile and desktop.',
      solution:
        'Crafted an emotional digital monument with user-gesture audio autoplay unblocking, interactive 101-reasons card book, milestone timeline chapters, canvas particle hearts, and wax-sealed letter.',
      highlights: [
        '3-Edition Modular Framework (Couples, Parents, Friends)',
        '101-Reasons Interactive Deck with Instant Tap-to-Flip',
        'Ambient HTML5 Audio Controller with Autoplay Policy Unlocker',
        'Chronological Milestone Chapter Story Cards',
        'Wax-Sealed Expandable Letter & Canvas Confetti Celebrations',
      ],
      tags: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind CSS v4', 'Framer Motion', 'HTML5 Audio'],
      liveUrl: 'https://signature-sigma.vercel.app',
      imagePath: 'assets/images/project-signature.png',
      color: 'from-rose-500/25 via-purple-500/20 to-electric-500/25',
      featured: true,
      accentBadge: 'Luxury Digital Product Flagship',
    },
  ];

  get filteredProjects(): PortfolioProject[] {
    if (this.activeFilter() === 'all') return this.projects;
    return this.projects.filter((p) => p.category === this.activeFilter());
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
