import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppSettings {
  titleFr: string;
  titleAr: string;
  leftLogo: string;
  rightLogo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private readonly defaultSettings: AppSettings = {
    titleFr: 'Programme de Développement Préfectoral de Rabat',
    titleAr: 'برنامج التنمية الإقليمية للرباط',
    leftLogo: 'assets/image.png',
    rightLogo: 'assets/image22.png'
  };

  private settingsSubject = new BehaviorSubject<AppSettings>(this.defaultSettings);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettingsFromStorage();
  }

  getCurrentSettings(): AppSettings {
    return this.settingsSubject.value;
  }

  updateSettings(settings: Partial<AppSettings>): void {
    const currentSettings = this.getCurrentSettings();
    const newSettings = { ...currentSettings, ...settings };
    this.settingsSubject.next(newSettings);
    this.saveSettingsToStorage(newSettings);
  }

  updateTitle(titleFr: string, titleAr: string): void {
    this.updateSettings({ titleFr, titleAr });
  }

  updateLeftLogo(logoUrl: string): void {
    this.updateSettings({ leftLogo: logoUrl });
  }

  updateRightLogo(logoUrl: string): void {
    this.updateSettings({ rightLogo: logoUrl });
  }

  resetToDefaults(): void {
    this.settingsSubject.next({ ...this.defaultSettings });
    this.clearStorageSettings();
  }

  private loadSettingsFromStorage(): void {
    try {
      // Load app settings
      const savedSettings = localStorage.getItem('appSettings');
      let settings = { ...this.defaultSettings };

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        settings.titleFr = parsed.titleFr || this.defaultSettings.titleFr;
        settings.titleAr = parsed.titleAr || this.defaultSettings.titleAr;
      }

      // Load logos
      const savedLeftLogo = localStorage.getItem('leftLogo');
      if (savedLeftLogo) {
        settings.leftLogo = savedLeftLogo;
      }

      const savedRightLogo = localStorage.getItem('rightLogo');
      if (savedRightLogo) {
        settings.rightLogo = savedRightLogo;
      }

      this.settingsSubject.next(settings);
    } catch (error) {
      console.error('Error loading settings from storage:', error);
      this.settingsSubject.next({ ...this.defaultSettings });
    }
  }

  private saveSettingsToStorage(settings: AppSettings): void {
    try {
      // Save titles
      localStorage.setItem('appSettings', JSON.stringify({
        titleFr: settings.titleFr,
        titleAr: settings.titleAr
      }));

      // Save logos separately for backward compatibility
      if (settings.leftLogo !== this.defaultSettings.leftLogo) {
        localStorage.setItem('leftLogo', settings.leftLogo);
      } else {
        localStorage.removeItem('leftLogo');
      }

      if (settings.rightLogo !== this.defaultSettings.rightLogo) {
        localStorage.setItem('rightLogo', settings.rightLogo);
      } else {
        localStorage.removeItem('rightLogo');
      }
    } catch (error) {
      console.error('Error saving settings to storage:', error);
    }
  }

  private clearStorageSettings(): void {
    localStorage.removeItem('appSettings');
    localStorage.removeItem('leftLogo');
    localStorage.removeItem('rightLogo');
  }
}
