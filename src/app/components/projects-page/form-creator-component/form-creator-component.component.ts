import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';

declare const google: any;
const SCOPES = [
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/forms.responses.readonly'
];

@Component({
  selector: 'app-form-creator-component',
  templateUrl: './form-creator-component.component.html',
  styleUrl: './form-creator-component.component.css'
})
export class FormCreatorComponentComponent {
  CLIENT_ID = environment.googleClientId;

  public async createForm() {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/forms.body',
      callback: (response: any) => {
        if (response.access_token) {
          this.createGoogleForm(response.access_token);
        }
      }
    });
  
    tokenClient.requestAccessToken();
  }

  private async createGoogleForm(token: string) {

    const initialForm = {
      info: {
        title: 'Lead Sunday Form'
      }
    }

    const formUpdate = {
      requests: [
        {
          updateFormInfo: {
            info: {
              description: "Your form description"
            },
            updateMask: "description"
          }
        },
        {
          createItem: {
            item: {
              title: "Question 1",
              description: "Question description",
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [
                      { value: "Option 1" },
                      { value: "Option 2" }
                    ]
                  }
                }
              }
            },
            location: { index: 0 }
          }
        }
      ]
    }
    
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
    
      // Now update the form
      const formUpdate = {
        requests: [
          {
            updateFormInfo: {
              info: {
                description: "Your form description"
              },
              updateMask: "description"
            }
          }
        ]
      };
    
      await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formUpdate)
      });
    
      window.open(`https://docs.google.com/forms/d/${formId}/edit`, '_blank');
    } catch (error) {
      console.error('Error:', error);
    }
   }
}