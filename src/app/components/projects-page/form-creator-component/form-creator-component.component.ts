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

    // Form update using batch update
    const formUpdate = {
      requests: [
        {
          updateFormInfo: {
            info: {
              description: "If the second or third choice votes are empty, that can mean you won’t attend if your other choices don’t win."
            },
            updateMask: "description"
          }
        },
        {
          createItem: {
            item: {
              title: "First Name (don't duplicate votes):",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: false  // false for short answer, true for paragraph
                  }
                }
              }
            },
            location: { index: 0 }
          }
        },
        {
          createItem: {
            item: {
              title: "Last Name (so I know who you are if you’re new):",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {
                    paragraph: false
                  }
                }
              }
            },
            location: { index: 1 }
          }
        },
        {
          createItem: {
            item: {
              title: "First Place Choice",
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                  }
                }
              }
            },
            location: { index: 2 }
          }
        },
        {
          createItem: {
            item: {
              title: "Second Place Choice",
              questionItem: {
                question: {
                  required: false,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                  }
                }
              }
            },
            location: { index: 3 }
          }
        },
        {
          createItem: {
            item: {
              title: "Third Place Choice",
              questionItem: {
                question: {
                  required: false,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                  }
                }
              }
            },
            location: { index: 4 }
          }
        },
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