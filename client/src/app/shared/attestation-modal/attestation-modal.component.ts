import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountryRequirement {
  country: string;
  timeline: string;
  requirements: string[];
  notes?: string;
  flag: string;
}

@Component({
  selector: 'app-attestation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attestation-modal.component.html',
  styleUrl: './attestation-modal.component.css',
})
export class AttestationModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() selectAttestation = new EventEmitter<void>();

  activeTab = signal<'categories' | 'countries'>('categories');
  selectedCategory = signal<string>('all');

  readonly coreServices = [
    {
      id: 'educational',
      title: 'Educational Certificates',
      turnaround: '1–10 Working Days',
      requirements: 'Original degree / diploma + passport copy',
      description: 'Attestation for degrees, diplomas, high school records, and academic transcripts for employment visas and university admissions.',
    },
    {
      id: 'apostille',
      title: 'Apostille Attestation',
      turnaround: '1–10 Working Days',
      requirements: 'Original certificate + passport copy',
      description: 'Hague Apostille Convention authentication for international legal validity across all member countries.',
    },
    {
      id: 'vital',
      title: 'Marriage, Birth & TC',
      turnaround: '1–10 Working Days',
      requirements: 'Original certificates + passport copies',
      description: 'Attestation for marriage certificates, birth certificates, and transfer certificates (TC) for family visas and school enrollments.',
    },
    {
      id: 'mofa-uae',
      title: 'MOFA UAE Attestation',
      turnaround: '1–2 Working Days (Fast-Track)',
      requirements: 'Original certificate previously attested by home country embassy',
      description: 'Official Ministry of Foreign Affairs (MOFA) attestation in the UAE for work, residency, and commercial licensing.',
    },
  ];

  readonly countries: CountryRequirement[] = [
    {
      country: 'United Arab Emirates (MOFA)',
      timeline: '1–2 Working Days',
      requirements: ['Original Certificate', 'Embassy Verification Stamp'],
      notes: 'Express processing available for urgent employment & family visas.',
      flag: '🇦🇪',
    },
    {
      country: 'United Kingdom',
      timeline: '1–20 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇬🇧',
    },
    {
      country: 'United States',
      timeline: '1–2 Months',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇺🇸',
    },
    {
      country: 'Australia',
      timeline: '28 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇦🇺',
    },
    {
      country: 'Canada',
      timeline: '20–22 Weeks',
      requirements: ['Original Certificate Transcript', 'Direct University Postal Verification'],
      notes: 'Transcripts are posted directly to embassy per Canadian consular guidelines.',
      flag: '🇨🇦',
    },
    {
      country: 'Germany',
      timeline: '5–6 Weeks',
      requirements: ['Original Certificate', 'Passport Copy', 'ID Card Copy', 'Signed Authorization Letter'],
      flag: '🇩🇪',
    },
    {
      country: 'Ireland',
      timeline: '22–25 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇮🇪',
    },
    {
      country: 'Netherlands',
      timeline: '20 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇳🇱',
    },
    {
      country: 'South Africa',
      timeline: '22–25 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇿🇦',
    },
    {
      country: 'Jordan',
      timeline: '18–22 Working Days',
      requirements: ['Original Certificates', 'Passport Copy'],
      flag: '🇯🇴',
    },
  ];

  onClose(): void {
    this.close.emit();
  }

  onInquire(): void {
    this.close.emit();
    this.selectAttestation.emit();
  }
}

