import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioComponent } from '../../sections/portfolio/portfolio.component';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PortfolioComponent],
  templateUrl: './work-page.component.html',
  styleUrl: './work-page.component.css',
})
export class WorkPageComponent {}

