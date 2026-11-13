import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  readonly trustStats = [
    { id: 'projects', value: '50+', label: 'Projects Delivered' },
    { id: 'speed', value: '48h', label: 'Fast Turnaround' },
    { id: 'satisfaction', value: '100%', label: 'Client Satisfaction' },
    { id: 'support', value: '24/7', label: 'Dedicated Support' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const el = document.querySelector('.hero-content');
        el?.classList.add('loaded');
      }, 100);
    }
  }

  scrollTo(anchor: string): void {
    if (anchor === 'contact') {
      this.router.navigate(['/contact']);
      return;
    }
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
