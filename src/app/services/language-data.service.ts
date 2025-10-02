import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { ServiceService } from '../service.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageDataService {

  constructor(
    private translationService: TranslationService,
    private serviceService: ServiceService
  ) {}

  /**
   * Get axes based on current language
   */
  getAxes(): Observable<string[]> {
    const currentLang = this.translationService.getCurrentLanguage();
    if (currentLang === 'ar') {
      return this.serviceService.axesAr();
    } else {
      return this.serviceService.axes();
    }
  }

  /**
   * Get objectives based on current language and selected axes
   */
  getObjectivesByAxes(axes: string[]): Observable<string[]> {
    const currentLang = this.translationService.getCurrentLanguage();
    if (currentLang === 'ar') {
      return this.serviceService.findDistinctObjectifsByAxesAr(axes);
    } else {
      return this.serviceService.findDistinctObjectifsByAxes(axes);
    }
  }

  /**
   * Get the appropriate field value based on current language
   */
  getLocalizedField(item: any, fieldName: string): string {
    const currentLang = this.translationService.getCurrentLanguage();
    
    if (currentLang === 'ar') {
      const arabicField = item[fieldName + '_ar'];
      // Fallback to French if Arabic is not available
      return arabicField && arabicField.trim() !== '' ? arabicField : item[fieldName];
    } else {
      return item[fieldName];
    }
  }

  /**
   * Get axes field name based on current language
   */
  getAxesFieldName(): string {
    const currentLang = this.translationService.getCurrentLanguage();
    return currentLang === 'ar' ? 'axes_ar' : 'axes';
  }

  /**
   * Get objectif field name based on current language
   */
  getObjectifFieldName(): string {
    const currentLang = this.translationService.getCurrentLanguage();
    return currentLang === 'ar' ? 'objectif_ar' : 'objectif';
  }

  /**
   * Get projet_action field name based on current language
   */
  getProjetActionFieldName(): string {
    const currentLang = this.translationService.getCurrentLanguage();
    return currentLang === 'ar' ? 'projet_action_ar' : 'projet_action';
  }

  /**
   * Transform data array to show appropriate language fields
   */
  transformDataForCurrentLanguage(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      displayAxes: this.getLocalizedField(item, 'axes'),
      displayObjectif: this.getLocalizedField(item, 'objectif'),
      displayProjetAction: this.getLocalizedField(item, 'projet_action')
    }));
  }

  /**
   * Get reactive axes that update when language changes
   */
  getReactiveAxes(): Observable<string[]> {
    return this.translationService.currentLanguage$.pipe(
      switchMap(() => this.getAxes())
    );
  }

  /**
   * Get reactive objectives that update when language changes
   */
  getReactiveObjectivesByAxes(axes: string[]): Observable<string[]> {
    return this.translationService.currentLanguage$.pipe(
      switchMap(() => this.getObjectivesByAxes(axes))
    );
  }

  /**
   * Transform chart data to use appropriate language labels
   */
  transformChartData(chartData: any): any {
    if (!chartData) return chartData;

    const currentLang = this.translationService.getCurrentLanguage();
    const transformedData = { ...chartData };
    
    // Transform pie chart data (axes names)
    if (transformedData.piedata) {
      transformedData.piedata = transformedData.piedata.map((item: any) => ({
        ...item,
        name: this.translationService.translate(`strategicAxes.${item.name}`) || item.name
      }));
    }

    // Transform objectives (projetActions) for bar chart
    if (transformedData.projetActionsWithArabic && currentLang === 'ar') {
      transformedData.projetActions = transformedData.projetActionsWithArabic.map((item: any) => 
        item.objectif_ar || item.name
      );
    }

    return transformedData;
  }

  /**
   * Transform pie chart data specifically for strategic axes
   * Uses actual database data (axes_ar) when available, falls back to translation keys
   */
  transformPieChartData(pieData: any[]): any[] {
    if (!pieData) return pieData;

    const currentLang = this.translationService.getCurrentLanguage();
    
    return pieData.map((item: any) => {
      let displayName = item.name;
      
      if (currentLang === 'ar') {
        // Try to use axes_ar from database first, then fall back to translation
        displayName = item.axes_ar || 
                     item.name_ar || 
                     this.translationService.translate(`strategicAxes.${item.name}`) || 
                     item.name;
      } else {
        // For French, use the original name or axes field
        displayName = item.axes || item.name;
      }
      
      return {
        ...item,
        name: displayName
      };
    });
  }

  /**
   * Get chart legend labels in current language
   */
  getChartLegends(): any {
    return {
      cpContribution: this.translationService.translate('dashboard.chartLegends.cpContribution'),
      estimatedCost: this.translationService.translate('dashboard.chartLegends.estimatedCost')
    };
  }
}
