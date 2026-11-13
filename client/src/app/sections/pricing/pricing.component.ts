import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular: boolean;
  cta: string;
  badge?: string;
}

interface SocialPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  readonly plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Custom Quote',
      period: 'Discussed on Call / Text',
      description: 'Perfect for small businesses and brands establishing a clean online presence.',
      popular: false,
      cta: 'Discuss Project',
      features: [
        'Up to 5 custom-designed pages',
        'Mobile-responsive architecture',
        'Interactive contact form',
        'Basic on-page SEO setup',
        'WhatsApp direct chat integration',
        '2 rounds of revisions',
        '30-day post-launch support',
      ],
      notIncluded: [
        'Product catalog showcase',
        'AI chatbot integration',
        'Custom interactive AI tools',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: 'Custom Quote',
      period: 'Discussed on Call / Text',
      description: 'For growing businesses wanting a high-performance site with on-site AI features.',
      popular: true,
      cta: 'Discuss Project',
      badge: 'Most Popular',
      features: [
        'Up to 15 custom-designed pages',
        'AI Chatbot integration (answers visitor questions 24/7)',
        'Product catalog & showcase (browse products & details)',
        'High-speed performance optimization',
        'Social media feed & share integrations',
        'Advanced on-page SEO setup',
        '3 rounds of revisions',
        '3 months of ongoing support',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'Custom Quote',
      period: 'Discussed on Call / Text',
      description: 'Fully custom website equipped with tailor-made interactive AI web tools.',
      popular: false,
      cta: 'Discuss Project',
      features: [
        'Unlimited custom pages & unique layouts',
        'Custom interactive AI web tools (calculators, estimators, or product recommenders)',
        'Custom-trained AI chatbot (trained on your business docs & FAQs)',
        'AI-powered smart semantic search',
        'AI multi-language translation support',
        'Advanced custom API integrations',
        'Unlimited revisions until 100% satisfied',
        '6 months priority support & dedicated project manager',
      ],
    },
  ];

  readonly socialPlans: SocialPlan[] = [
    {
      name: 'Basic',
      price: 'Custom Retainer',
      period: 'Discussed on Call / Text',
      features: ['8 curated posts/month', '1 social platform', 'Caption writing & hashtags', 'Monthly performance report'],
    },
    {
      name: 'Growth',
      price: 'Custom Retainer',
      period: 'Discussed on Call / Text',
      features: ['20 posts & reels/month', '3 social platforms', 'Custom graphics & video reels', 'Bi-weekly strategy reviews'],
    },
    {
      name: 'Full Management',
      price: 'Custom Retainer',
      period: 'Discussed on Call / Text',
      features: ['Full publishing schedule', 'All major platforms', 'Custom content creation', 'Community engagement', 'Weekly strategy & analytics'],
    },
  ];

  constructor(private router: Router) {}

  scrollToContact(): void {
    this.router.navigate(['/contact']);
  }
}
