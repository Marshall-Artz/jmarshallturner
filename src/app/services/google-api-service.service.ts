import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleApiServiceService {
  CLIENT_ID = environment.googleClientId;

  public async requestGoogleFormsOAuthToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID, // Client ID for registered google forms api service
        scope: 'https://www.googleapis.com/auth/forms.body', // Request URL
        callback: (response: any) => { // Callback function for response
          if (response.access_token) {
            resolve(response.access_token);
          } else {
            reject('Failed to get OAuth token: ' + response);
          }
        }
      });

      tokenClient.requestAccessToken(); 
    })
  }
}
