import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  openIndex = signal<number | null>(null);

  readonly faqs: FaqItem[] = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Most projects are completed in 7–14 business days, depending on the complexity. Simple websites with up to 5 pages take about 7 days. Larger or more complex projects (e-commerce stores, custom integrations) typically take 14–21 days. We\'ll give you an exact timeline in your free consultation.',
    },
    {
      question: 'How much does a website cost?',
      answer: 'Pricing depends on the exact scope, number of pages, and interactive features you need. We discuss your project details on a quick call or message, and provide a clear, transparent quote before starting. Check out our Packages section or send us a message to discuss your project.',
    },
    {
      question: 'How many revisions do I get?',
      answer: 'The number of revision rounds depends on your plan: Starter includes 2 rounds, Business includes 3 rounds, and Premium includes unlimited revisions. A "round" means you give us a list of changes and we implement them all at once. Most clients are happy after 1–2 rounds.',
    },
    {
      question: 'Will my website be hosted, and do you handle that?',
      answer: 'Yes, we can handle hosting setup for you. We recommend reliable, fast hosts like SiteGround, Cloudflare Pages, or Vercel depending on your tech stack. Premium package includes 1 year of free hosting. We can also deploy to your existing host if you have one.',
    },
    {
      question: 'Do you offer ongoing maintenance and support?',
      answer: 'Absolutely. All packages come with a post-launch support period (30 days for Starter, 3 months for Business, 6 months for Premium). After that, you can sign up for a monthly maintenance plan for updates, backups, security patches, and content changes.',
    },
    {
      question: 'Can you also manage my social media?',
      answer: 'Yes! We offer Social Media Management as a standalone service or as an add-on to any website package. We create content, schedule posts, manage your community, and provide growth strategies for platforms like Instagram, Facebook, LinkedIn, and X (Twitter). See our Pricing section for plan details.',
    },
  ];

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
