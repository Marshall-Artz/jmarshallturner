import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var gapi: {
  load: Function;
  client: {
    init: Function;
    load: Function;
    forms: {
      forms: {
        create: Function;
      }
    };
  };
  auth2: any;
};

@Component({
  selector: 'app-form-creator-component',
  templateUrl: './form-creator-component.component.html',
  styleUrl: './form-creator-component.component.css'
})
export class FormCreatorComponentComponent {
  CLIENT_ID = environment.googleClientId;

  async createForm() {
    console.log("BUTTON HIT");
    // Load and init Google API
    await new Promise((resolve) => {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        clientId: this.CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/forms.body'
      });
      
      // Add this line to load Forms API
      await gapi.client.load('forms', 'v1');
      
      resolve(null);
    });
  });

    // Handle Google Sign-in
    const auth = gapi.auth2.getAuthInstance();
    if (!auth.isSignedIn.get()) {
      await auth.signIn();
    }

    // Create form template
    const form = {
      info: {
        title: 'Lead Sunday Form',
        documentTitle: 'Lead Sunday Form'
      },
      items: [
        {
          questionItem: {
            question: {
              required: true,
              textQuestion: {
                paragraph: false
              },
              title: 'Your Question Here'
            }
          }
        }
      ]
    };

    try {
      const response = await gapi.client.forms.forms.create({
        resource: form
      });
      
      // Open new form in new tab
      window.open(`https://docs.google.com/forms/d/${response.result.formId}/edit`, '_blank');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
