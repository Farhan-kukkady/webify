import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  projectDetails: string;
  budget: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  submitContact(data: ContactFormData): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, data).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 422) {
      errorMessage = error.error?.details?.[0]?.message ?? 'Please check your form fields.';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect. Please check your internet connection.';
    }

    return throwError(() => new Error(errorMessage));
  }
}
