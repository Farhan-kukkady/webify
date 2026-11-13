import { Component, OnInit, OnDestroy, HostListener, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

interface NavItem {
  label: string;
  route?: string;
  anchor?: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() openAttestation = new EventEmitter<void>();

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Services', anchor: 'services' },
    { label: 'Signature', route: '/products', isNew: true },
    { label: 'Work', route: '/work' },
    { label: 'Pricing & FAQ', route: '/pricing' },
    { label: 'Our Story', anchor: 'about' },
    { label: 'Contact', route: '/contact' },
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateScrollState();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  handleNavClick(item: NavItem): void {
    this.isMobileMenuOpen.set(false);

    if (item.route) {
      this.router.navigate([item.route]);
      return;
    }

    if (item.anchor) {
      if (this.router.url === '/' || this.router.url.startsWith('/#')) {
        const el = document.getElementById(item.anchor);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        this.router.navigate(['/'], { fragment: item.anchor });
      }
    }
  }

  navigateToHome(): void {
    this.isMobileMenuOpen.set(false);
    if (this.router.url === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }
}
