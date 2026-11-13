import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css',
})
export class ProcessComponent {
  readonly steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start with a free consultation to understand your goals, audience, and vision. No fluff — just clear, focused conversation.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
      duration: 'Day 1',
    },
    {
      number: '02',
      title: 'Design',
      description: 'We create wireframes and high-fidelity mockups for your approval. You see exactly what you\'re getting before a single line of code is written.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
      duration: 'Days 2–4',
    },
    {
      number: '03',
      title: 'Development',
      description: 'Our developers build your site with clean code, fast load times, and full responsiveness — exactly as designed.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      duration: 'Days 5–10',
    },
    {
      number: '04',
      title: 'Review & Revisions',
      description: 'You review the live staging site and request changes. We handle up to 3 rounds of revisions to make sure everything is perfect.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
      duration: 'Days 11–12',
    },
    {
      number: '05',
      title: 'Launch & Support',
      description: 'We deploy your site, set up analytics, and hand over everything you need. Then we stick around for ongoing support.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
      duration: 'Day 14',
    },
  ];
}
