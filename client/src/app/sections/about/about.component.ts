import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  accent: string;
  badge: string;
  socials: { linkedin?: string; twitter?: string; email?: string };
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly storyParagraphs = [
    {
      title: 'Built on Friendship & Shared Passion',
      text: 'Webify & Co began not in a corporate boardroom, but with two longtime friends who shared an obsession for exceptional digital craft. Farhan loved the logic of code and high-performance engineering; Ibrahim lived for compelling brand aesthetics and growth marketing. Together, we saw countless businesses struggling with clunky, outdated websites and disconnected social media that failed to convert visitors into customers.',
    },
    {
      title: 'Our Mission: Build. Brand. Grow.',
      text: 'We decided to combine our strengths and build the agency we wished existed: one with zero fluff, rapid execution, transparent fixed pricing, and uncompromising quality. From our first client project to delivering over 50+ successful launches worldwide, our dedication has never wavered — we build websites that truly grow businesses.',
    },
  ];

  readonly founders: TeamMember[] = [
    {
      name: 'Farhan Kukkady',
      role: 'Co-Founder & CEO',
      title: 'Technology, Website Development, Business Strategy & Client Solutions',
      description: 'Leads engineering, architecture, and technology execution at Webify & Co. Obsessed with lightning-fast performance, rock-solid code, and digital experiences that drive measurable business growth.',
      skills: ['Full-Stack Development', 'System Architecture', 'SEO Engineering', 'Client Strategy'],
      image: 'assets/images/team-farhan.jpg',
      accent: 'from-blue-500/20 to-electric-500/30',
      badge: 'Engineering & Strategy',
      socials: {
        linkedin: 'https://www.linkedin.com/in/farhan-kukkady/',
        email: 'mailto:farhan@webifyco.com',
      },
    },
    {
      name: 'Ibrahim Sahil',
      role: 'Co-Founder & CMO',
      title: 'Social Media Marketing, Branding, Creative Direction & Marketing Strategy',
      description: 'Heads creative direction, brand identity, and social media growth strategies. Passionate about crafting unforgettable visual stories that captivate audiences and turn followers into loyal clients.',
      skills: ['Creative Direction', 'Social Media Growth', 'Brand Identity', 'Conversion Copywriting'],
      image: 'assets/images/team-ibrahim.jpg',
      accent: 'from-purple-500/20 to-cyan-500/30',
      badge: 'Brand & Marketing',
      socials: {
        linkedin: 'https://www.linkedin.com/in/ibrahim-sahil/',
        email: 'mailto:ibrahimsahil@webifyco.com',
      },
    },
  ];

  readonly milestones = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '100%', label: 'Commitment to Quality' },
    { value: '24/7', label: 'Dedicated Communication' },
    { value: '14 Days', label: 'Average Delivery' },
  ];
}

