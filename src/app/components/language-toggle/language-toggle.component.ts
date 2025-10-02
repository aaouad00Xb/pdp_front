import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css']
})
export class LanguageToggleComponent implements OnInit {
  currentLanguage: string = 'fr';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    this.translationService.setLanguage(newLanguage);
  }

  setLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }
}
