import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pdp_Front';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    // Initialize language service - this will set the initial direction and language
    const currentLang = this.translationService.getCurrentLanguage();
    this.translationService.setLanguage(currentLang);
  }
}
