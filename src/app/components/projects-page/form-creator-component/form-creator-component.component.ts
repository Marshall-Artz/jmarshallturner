import { Component, signal } from '@angular/core';
import { googleFormInfo } from '@/assets/googleForm';
import { GoogleApiServiceService } from '@/app/services/google-api-service.service';

declare const google: any;

@Component({
  selector: 'app-form-creator-component',
  templateUrl: './form-creator-component.component.html',
  styleUrl: './form-creator-component.component.css'
})
export class FormCreatorComponentComponent {
  isLoading = signal(false);
  constructor(private googleApiService: GoogleApiServiceService) { }

  public async initializeGoogleFormsAuth() {
    try {
      const access_token = await this.googleApiService.requestGoogleFormsOAuthToken();
      await this.createGoogleForm(access_token);
    } catch (error) {
      alert(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async createGoogleForm(token: string) {
    this.isLoading.set(true); // Set loading state to true

    const today = new Date();
    const daysUntilSunday = (7 - today.getDay()) % 7;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);

    const formattedDate = `${nextSunday.getMonth() + 1}/${nextSunday.getDate()}/${nextSunday.getFullYear()}`;

    // Initial form creation
    const initialForm = {
      info: {
        documentTitle: `Lead Sunday ${formattedDate}`,
        title: `Lead Sunday ${formattedDate}`
      }
    }

    // Form information
    const updateForm = googleFormInfo;
    
    try {
      const response = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialForm)
      });
      
      const result = await response.json();
      const formId = result.formId;
    
      await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateForm)
      });
    
      window.open(`https://docs.google.com/forms/d/${formId}/edit`, '_blank');
    } catch (error) {
      console.error('Error:', error);
    }
   }
}