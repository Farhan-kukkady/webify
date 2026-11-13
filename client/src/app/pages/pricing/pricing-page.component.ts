import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PricingComponent } from '../../sections/pricing/pricing.component';
import { FaqComponent } from '../../sections/faq/faq.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PricingComponent, FaqComponent],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
})
export class PricingPageComponent {}

