import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type SignatureEdition = 'couple' | 'parents' | 'friends';

interface FlipCard {
  number: number;
  text: string;
}

interface TimelineChapter {
  badge: string;
  title: string;
  date: string;
  description: string;
}

interface EditionData {
  id: SignatureEdition;
  tabLabel: string;
  badge: string;
  subtitle: string;
  titleGradient: string;
  headline: string;
  quote: string;
  soundtrack: string;
  cardLabel: string;
  cardCountLabel: string;
  cards: FlipCard[];
  timelineTitle: string;
  timeline: TimelineChapter[];
  passcodeHint: string;
  passcodeUrl: string;
  accentGradient: string;
  borderColor: string;
}

@Component({
  selector: 'app-signature-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './signature-page.component.html',
  styleUrl: './signature-page.component.css',
})
export class SignaturePageComponent {
  readonly liveDemoUrl = 'https://signature-sigma.vercel.app';
  selectedEdition = signal<SignatureEdition>('couple');
  currentCardIndex = signal(0);
  isPlayingMusic = signal(false);

  readonly editions: Record<SignatureEdition, EditionData> = {
    couple: {
      id: 'couple',
      tabLabel: '💍 The Couple Edition',
      badge: 'Romantic Love Story Edition',
      subtitle: 'Anniversaries • Proposals • Birthdays • Weddings',
      titleGradient: 'from-rose-400 via-purple-300 to-electric-400',
      headline: 'A Timeless Love Story She Will Never Forget',
      quote: 'Flowers fade. Chocolates disappear. A personalized digital monument celebrating your love story is an intimate gift she will return to and treasure forever.',
      soundtrack: 'Golden Hour — JVKE',
      cardLabel: 'Reason',
      cardCountLabel: '100 reasons included',
      cards: [
        { number: 1, text: 'The way your laugh instantly brightens even my hardest days.' },
        { number: 7, text: 'How you always remember the tiniest details about what makes me smile.' },
        { number: 23, text: 'The way you hold my hand every time we cross the street.' },
        { number: 50, text: 'Our late-night conversations that turn minutes into hours.' },
        { number: 100, text: 'Because choosing you is the easiest decision I will ever make, every single day.' },
      ],
      timelineTitle: 'Our Love Story Chapters',
      timeline: [
        {
          badge: 'Chapter 01',
          title: 'The First Time Our Eyes Met',
          date: 'September 14, 2021',
          description: 'A crowded coffee shop on a rainy Tuesday. Neither of us expected the quick 10-minute chat to turn into four hours of non-stop laughing.',
        },
        {
          badge: 'Chapter 02',
          title: 'The Unplanned Road Trip',
          date: 'July 8, 2022',
          description: 'Windows down, driving into the sunset with nothing but a playlist and zero itinerary. That was the moment I realized I never wanted to travel through life without you.',
        },
        {
          badge: 'Chapter 03',
          title: 'Our First Place Together',
          date: 'March 1, 2023',
          description: 'Sitting on packing boxes, eating takeout on the floor, knowing every wall around us was the start of our forever home.',
        },
      ],
      passcodeHint: 'Enter your anniversary date (MMDD)',
      passcodeUrl: 'signature-sigma.vercel.app',
      accentGradient: 'from-rose-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-rose-500/30',
    },
    parents: {
      id: 'parents',
      tabLabel: '👨‍👩‍👧‍👦 The Parents Edition',
      badge: 'Honor & Gratitude Edition',
      subtitle: 'Golden Anniversaries • 50th / 60th Birthdays • Retirement',
      titleGradient: 'from-amber-400 via-orange-300 to-yellow-200',
      headline: 'A Living Legacy Honoring Everything They Gave Us',
      quote: 'Our parents spent decades building our future without asking for anything in return. Give them a timeless tribute archiving their sacrifice, love, and life milestones.',
      soundtrack: 'Clair de Lune — Debussy (Acoustic Piano)',
      cardLabel: 'Gratitude Note',
      cardCountLabel: '50+ heartfelt tributes',
      cards: [
        { number: 1, text: 'For working late nights without ever letting us see you tired.' },
        { number: 12, text: 'For standing on the sidelines of every single game, cheering loudest.' },
        { number: 25, text: 'For teaching us that integrity and kindness matter more than anything else.' },
        { number: 40, text: 'For giving up your own dreams so our dreams could take flight.' },
        { number: 50, text: 'For being the unwavering foundation our entire family rests on.' },
      ],
      timelineTitle: 'Generations of Milestones',
      timeline: [
        {
          badge: 'Milestone 01',
          title: 'Where It All Began — The Wedding',
          date: 'May 20, 1988',
          description: 'Two young dreamers promising to face the world together, with humble beginnings and infinite heart.',
        },
        {
          badge: 'Milestone 02',
          title: 'Welcoming the First Generation',
          date: 'November 12, 1993',
          description: 'The sleepless nights, the first steps, and the unconditional sacrifices made every single day.',
        },
        {
          badge: 'Milestone 03',
          title: '35 Years of Unshakable Devotion',
          date: 'Present Day',
          description: 'Surrounded by children and grandchildren who carry your values, your laughter, and your legacy.',
        },
      ],
      passcodeHint: 'Enter the family legacy year (YYYY)',
      passcodeUrl: 'the-family-legacy.webifyco.com',
      accentGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
    },
    friends: {
      id: 'friends',
      tabLabel: '🥂 The Friendship Edition',
      badge: 'Unbreakable Bond Edition',
      subtitle: 'Best Friend Birthdays • Best Man / Maid of Honor • Graduations',
      titleGradient: 'from-cyan-400 via-electric-400 to-purple-400',
      headline: 'The Ultimate Vault of Chaos, Loyalty & Unfiltered Memories',
      quote: 'Through bad decisions, inside jokes nobody else gets, and the hardest seasons of life — true friends deserve a legendary digital monument.',
      soundtrack: 'Midnight City — M83',
      cardLabel: 'Inside Joke & Memory',
      cardCountLabel: '50 hilarious & heartfelt memories',
      cards: [
        { number: 1, text: 'Remember that 3 AM Denny\'s run when we decided to change our entire college majors?' },
        { number: 8, text: 'The time we got hopelessly lost in Barcelona with 2% battery and laughed the whole way.' },
        { number: 19, text: 'For being the one call I can make at 2 AM with zero explanations needed.' },
        { number: 35, text: 'Every awful haircut and questionable fashion phase we survived together.' },
        { number: 50, text: 'Because having you as my best friend made surviving my 20s not just possible, but legendary.' },
      ],
      timelineTitle: 'The Ride-Or-Die Chronicle',
      timeline: [
        {
          badge: 'Day One',
          title: 'Freshman Year Orientation',
          date: 'August 24, 2016',
          description: 'Bonded over mutual disdain for icebreaker games, and immediately plotted our escape.',
        },
        {
          badge: 'The Epic Summer',
          title: 'The Budget Backpacking Trip',
          date: 'June 2019',
          description: 'Lost passports, missed trains, incredible sunsets, and memories that defined our entire twenties.',
        },
        {
          badge: 'Still Standing',
          title: 'Adulting & Still Unstoppable',
          date: 'Today & Beyond',
          description: 'No matter the cities, careers, or distance — the squad group chat remains undefeated.',
        },
      ],
      passcodeHint: 'Enter our inside joke secret code',
      passcodeUrl: 'the-squad-vault.webifyco.com',
      accentGradient: 'from-cyan-500/20 via-electric-500/10 to-transparent',
      borderColor: 'border-cyan-500/30',
    },
  };

  readonly activeEdition = computed(() => this.editions[this.selectedEdition()]);

  readonly inclusions = [
    {
      title: 'Custom Vanity Domain',
      desc: 'Your own private URL like farhanandfarah.com or thefamilylegacy.com with free SSL.',
    },
    {
      title: 'Interactive 100-Card Deck',
      desc: 'Flip cards for 100 reasons, gratitude notes, or inside jokes with instant tap-to-flip.',
    },
    {
      title: 'Cinematic Audio Soundtrack',
      desc: 'Curated background music that sets the emotional tone the second the page opens.',
    },
    {
      title: 'Chronological Story Timeline',
      desc: 'Milestone chapters, dates, and memories woven into an interactive narrative.',
    },
    {
      title: 'Passcode-Protected Vault',
      desc: 'Total privacy with a custom secret passcode so only your special someone can view it.',
    },
    {
      title: '1-Year Premium Hosting Included',
      desc: 'High-speed cloud hosting with 99.9% uptime, renewable anytime without hassles.',
    },
  ];

  selectEdition(edition: SignatureEdition): void {
    this.selectedEdition.set(edition);
    this.currentCardIndex.set(0);
  }

  nextCard(): void {
    const totalCards = this.activeEdition().cards.length;
    this.currentCardIndex.update((i) => (i + 1) % totalCards);
  }

  prevCard(): void {
    const totalCards = this.activeEdition().cards.length;
    this.currentCardIndex.update((i) => (i - 1 + totalCards) % totalCards);
  }

  toggleMusic(): void {
    this.isPlayingMusic.update((v) => !v);
  }
}

