import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../sections/hero/hero.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { WhyUsComponent } from '../../sections/why-us/why-us.component';
import { ProcessComponent } from '../../sections/process/process.component';
import { AboutComponent } from '../../sections/about/about.component';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    ServicesComponent,
    WhyUsComponent,
    ProcessComponent,
    AboutComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly featuredWork = [
    {
      title: 'Phoenix Colour Technologies',
      category: 'Enterprise AI & Web Engineering',
      location: 'Dubai, UAE & GCC',
      desc: 'Next-generation industrial packaging platform featuring a 3-step AI Substrate Selector, live Makeready Profit Recovery ROI Calculator, and Google Gemini Flash technical assistant.',
      tags: ['Next.js 16', 'React 19', 'Google Gemini AI', 'ROI Calculator', 'Vercel Edge'],
      image: 'assets/images/project-phoenix.webp',
      badge: 'Featured Enterprise Case Study',
      liveUrl: 'https://phoenix.webifyco.com',
    },
    {
      title: 'Webify Signature — "Elena" Luxury Experience',
      category: 'Interactive Luxury Keepsake',
      location: 'Global (US & Worldwide)',
      desc: 'A permanent digital celebration universe engineered with 101 interactive flip reasons, ambient soundtrack autoplay unblocker, milestone timeline chapters, and canvas floating hearts.',
      tags: ['React 19', 'TypeScript', 'Vite 8', 'Framer Motion', 'Tailwind v4'],
      image: 'assets/images/project-signature.png',
      badge: 'Flagship Digital Product',
      liveUrl: 'https://signature-sigma.vercel.app',
    },
  ];

  constructor(public modalService: ModalService) {}
}
