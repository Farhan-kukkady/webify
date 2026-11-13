import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isAttestationModalOpen = signal(false);

  openAttestation(): void {
    this.isAttestationModalOpen.set(true);
  }

  closeAttestation(): void {
    this.isAttestationModalOpen.set(false);
  }
}

