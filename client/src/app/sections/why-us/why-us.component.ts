import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Benefit {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css',
})
export class WhyUsComponent {
  readonly benefits: Benefit[] = [
    {
      id: 'fast-delivery',
      title: 'Lightning-Fast Delivery',
      description: 'Most projects delivered in 7–14 days. We move fast without cutting corners.',
    },
    {
      id: 'modern-tech',
      title: 'Modern Technology',
      description: 'We use the latest frameworks — React, Next.js, Angular — for fast, scalable sites.',
    },
    {
      id: 'mobile-first',
      title: 'Mobile-First Design',
      description: 'Every site is built mobile-first — perfect on phones, tablets, and desktops.',
    },
    {
      id: 'seo-ready',
      title: 'SEO Ready Out of the Box',
      description: 'Semantic HTML, fast load times, and proper meta tags — built in from day one.',
    },
    {
      id: 'pricing',
      title: 'Transparent Pricing',
      description: 'Clear, fixed-price packages — no hidden fees, no surprises. You know exactly what you pay.',
    },
    {
      id: 'support',
      title: 'Ongoing Support',
      description: 'We don\'t disappear after launch. Monthly support plans and quick response times.',
    },
  ];
}
