import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContactService, ContactFormData } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  readonly services = [
    { value: 'website-design', label: 'Website Design & Development' },
    { value: 'signature-site', label: 'Webify Signature (Couple, Parents, Friends Edition)' },
    { value: 'document-attestation', label: 'Document Attestation & Verification' },
    { value: 'ecommerce', label: 'Product Catalog & E-Commerce' },
    { value: 'landing-page', label: 'High-Converting Landing Page' },
    { value: 'redesign', label: 'Website Redesign & Speed Optimization' },
    { value: 'social-media', label: 'Social Media Management & Growth' },
    { value: 'branding', label: 'Brand Identity & Visual Design' },
    { value: 'seo', label: 'SEO & Performance Engineering' },
    { value: 'other', label: 'Custom AI Tools / Other Request' },
  ];

  readonly budgets = [
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-3k', label: '$1,000 – $3,000' },
    { value: '3k-5k', label: '$3,000 – $5,000' },
    { value: '5k-10k', label: '$5,000 – $10,000' },
    { value: '10k-plus', label: '$10,000+' },
    { value: 'not-sure', label: 'To be discussed on call / text' },
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\d\s+\-().]{7,25}$/)]],
      service: ['website-design', [Validators.required]],
      projectDetails: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      budget: ['not-sure'],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const requestedService = params['service'];
      if (requestedService && this.services.some((s) => s.value === requestedService)) {
        this.contactForm.patchValue({ service: requestedService });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const formData: ContactFormData = this.contactForm.value;

    this.contactService.submitContact(formData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset({
          service: 'website-design',
          budget: 'not-sure',
        });
      },
      error: (err: Error) => {
        this.isSubmitting.set(false);
        this.submitError.set(err.message || 'Something went wrong. Please reach out via WhatsApp or email.');
      },
    });
  }
}

