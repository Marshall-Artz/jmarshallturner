import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-json-clock',
  templateUrl: './json-clock.component.html',
  styleUrls: ['./json-clock.component.css']
})
export class JsonClockComponent implements OnInit {
  jsonData: any = {}; // Stores the raw JSON
  formattedJsonData: SafeHtml = ''; // Stores the colored, formatted JSON

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  private updateClock(): void {
    const now = new Date();
    this.jsonData = {
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      date: now.toISOString().split('T')[0],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Store the formatted and safe JSON
    this.formattedJsonData = this.sanitizer.bypassSecurityTrustHtml(this.formatJson(this.jsonData));
  }

  private formatJson(json: any): string {
    let jsonText = JSON.stringify(json, null, 2); // Pretty-print JSON

    // Apply syntax highlighting using regex replacements
    jsonText = jsonText
      .replace(/"(.*?)":/g, '<span class="json-key">"$1"</span>:') // Keys (light blue)
      .replace(/"(.*?)"/g, '<span class="json-string">"$1"</span>') // Strings (red-orange)
      .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>') // Booleans (blue)
      .replace(/\b(null)\b/g, '<span class="json-null">$1</span>') // Null (purple)
      .replace(/(\d+)/g, '<span class="json-number">$1</span>'); // Numbers (green)

    return `<code>${jsonText}</code>`; // Wrap in <code> to enforce formatting
  }
}
