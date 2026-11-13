import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WhatsappButtonComponent } from './shared/whatsapp-button/whatsapp-button.component';
import { AttestationModalComponent } from './shared/attestation-modal/attestation-modal.component';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    WhatsappButtonComponent,
    AttestationModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Webify & Co';

  constructor(
    public modalService: ModalService,
    private router: Router,
  ) {}

  onSelectAttestation(): void {
    this.modalService.closeAttestation();
    this.router.navigate(['/contact'], {
      queryParams: { service: 'document-attestation' },
    });
  }
}
