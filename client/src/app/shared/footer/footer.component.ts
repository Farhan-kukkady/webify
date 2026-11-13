import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Output() openAttestation = new EventEmitter<void>();

  readonly currentYear = new Date().getFullYear();

  readonly services = [
    { label: 'Website Design & Development', route: '/contact' },
    { label: 'Webify Signature (Couple, Parents, Friends)', route: '/products' },
    { label: 'Document Attestation Services', isModal: true },
    { label: 'Social Media Management & Growth', route: '/pricing' },
    { label: 'Brand Identity & Visual Design', route: '/contact' },
    { label: 'SEO & Performance Engineering', route: '/contact' },
  ];

  readonly quickLinks = [
    { label: 'Services', anchor: 'services' },
    { label: 'Signature Sites', route: '/products' },
    { label: 'Work & Portfolio', route: '/work' },
    { label: 'Pricing & FAQ', route: '/pricing' },
    { label: 'Our Story', anchor: 'about' },
    { label: 'Contact', route: '/contact' },
  ];

  readonly socials = [
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://instagram.com/webifyco',
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      url: 'https://twitter.com/webifyco',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/webifyco',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://facebook.com/webifyco',
    },
  ];

  scrollTo(anchor: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
