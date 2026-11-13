import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css',
})
export class WhatsappButtonComponent {
  readonly whatsappUrl = 'https://wa.me/916361861352?text=Hi%20Webify%20%26%20Co%2C%20I%27m%20interested%20in%20your%20services!';
}
