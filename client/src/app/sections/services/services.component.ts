import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../core/services/modal.service';

interface ServiceFeature {
  text: string;
}

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  featured: boolean;
  badge?: string;
  ctaText?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  @Output() openAttestation = new EventEmitter<void>();

  readonly services: ServiceCard[] = [
    {
      id: 'web-development',
      title: 'Website Design & Development',
      subtitle: 'Our Core Service',
      description: 'We craft beautiful, high-performance websites tailored to your brand and business goals. From concept to launch — and beyond.',
      featured: true,
      badge: 'Core Service',
      features: [
        { text: 'Business & corporate websites' },
        { text: 'E-commerce & interactive product showcases' },
        { text: 'High-converting landing pages' },
        { text: 'Portfolio & personal brand sites' },
        { text: 'Website redesigns & speed migrations' },
        { text: 'Ongoing maintenance & technical updates' },
      ],
    },
    {
      id: 'social-media',
      title: 'Social Media Management',
      subtitle: 'Grow Your Presence',
      description: 'Build an engaged community and grow your brand across all major platforms.',
      featured: false,
      features: [
        { text: 'Content creation & visual design' },
        { text: 'Post scheduling & publishing' },
        { text: 'Community management & engagement' },
        { text: 'Growth strategy & analytics' },
      ],
    },
    {
      id: 'document-attestation',
      title: 'Document Attestation Services',
      subtitle: 'Global Legalization',
      description: 'Fast and reliable document attestation with MOFA UAE, embassies, and apostille verification across 10+ countries.',
      featured: false,
      ctaText: 'View Country Coverage',
      features: [
        { text: 'Educational degrees & school records' },
        { text: 'Marriage, birth & transfer certificates (TC)' },
        { text: 'MOFA UAE fast-track (1–2 days)' },
        { text: 'UK, US, Canada, Australia & 10+ countries' },
      ],
    },
    {
      id: 'branding',
      title: 'Brand Identity',
      subtitle: 'Stand Out',
      description: 'Logo design, color palettes, typography, and brand guidelines that make you memorable.',
      featured: false,
      features: [
        { text: 'Custom logo design & icon marks' },
        { text: 'Color & typography design systems' },
        { text: 'Brand style guides & social kits' },
        { text: 'Visual brand positioning' },
      ],
    },
    {
      id: 'seo',
      title: 'SEO & Performance',
      subtitle: 'Get Found Online',
      description: 'Technical SEO, on-page optimization, and performance audits to climb Google rankings.',
      featured: false,
      features: [
        { text: 'Technical SEO audits & fixes' },
        { text: 'On-page keyword optimization' },
        { text: 'Performance & Core Web Vitals' },
        { text: 'Search Console & indexing' },
      ],
    },
  ];

  constructor(private modalService: ModalService) {}

  triggerAttestationModal(): void {
    this.modalService.openAttestation();
    this.openAttestation.emit();
  }
}
