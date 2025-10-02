import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { ServiceService } from '../service.service';
import { Observable, switchMap, of, map } from 'rxjs';

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
   * Get axes with both French and Arabic values for dropdown
   * Returns array of objects with both display text and backend value
   */
  getAxesWithMapping(): Observable<{display: string, value: string}[]> {
    const currentLang = this.translationService.getCurrentLanguage();
    
    if (currentLang === 'ar') {
      // Get both French and Arabic axes
      return this.serviceService.axes().pipe(
        switchMap(frenchAxes => {
          return this.serviceService.axesAr().pipe(
            map(arabicAxes => {
              // Create mapping objects
              return frenchAxes.map((frenchAxe, index) => ({
                display: arabicAxes[index] || frenchAxe, // Show Arabic if available, fallback to French
                value: frenchAxe // Always use French for backend
              }));
            })
          );
        })
      );
    } else {
      // For French, display and value are the same
      return this.serviceService.axes().pipe(
        map(axes => axes.map(axe => ({
          display: axe,
          value: axe
        })))
      );
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
    
    console.log(`Getting localized field: ${fieldName}, language: ${currentLang}`);
    console.log(`Item keys:`, Object.keys(item));
    
    if (currentLang === 'ar') {
      const arabicField = item[fieldName + '_ar'];
      console.log(`Arabic field (${fieldName}_ar):`, arabicField);
      console.log(`French field (${fieldName}):`, item[fieldName]);
      
      // Fallback to French if Arabic is not available
      const result = arabicField && arabicField.trim() !== '' ? arabicField : item[fieldName];
      console.log(`Returning:`, result);
      return result;
    } else {
      console.log(`Returning French:`, item[fieldName]);
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
    if (!data || data.length === 0) return data;
    
    const currentLang = this.translationService.getCurrentLanguage();
    console.log('Transforming data for language:', currentLang);
    console.log('Sample data item:', data[0]);
    
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

    // Transform dataset names (legend labels) for bar chart
    if (transformedData.dataset) {
      transformedData.dataset = transformedData.dataset.map((dataset: any) => ({
        ...dataset,
        name: this.translateDatasetName(dataset.name)
      }));
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

  /**
   * Translate dataset names (legend labels) for charts
   */
  private translateDatasetName(name: string): string {
    const translations: { [key: string]: string } = {
      'estimatedCost': this.translationService.translate('dashboard.chartLegends.estimatedCost'),
      'cpContribution': this.translationService.translate('dashboard.chartLegends.cpContribution'),
      'partnerContribution': this.translationService.translate('dashboard.chartLegends.partnerContribution')
    };
    
    return translations[name] || name;
  }

  /**
   * Convert selected axes to French for backend queries
   * When Arabic axes are selected, convert them to French equivalents
   */
  private convertAxesToFrench(selectedAxes: string[]): Observable<string[]> {
    const currentLang = this.translationService.getCurrentLanguage();
    
    if (currentLang === 'fr') {
      // Already in French, return as-is
      return of(selectedAxes);
    }
    
    // For Arabic, we need to find the French equivalents
    // Get all French axes and their Arabic translations, then map backwards
    return this.serviceService.axes().pipe(
      switchMap(frenchAxes => {
        return this.serviceService.axesAr().pipe(
          map(arabicAxes => {
            const mapping: { [arabic: string]: string } = {};
            
            // Create a reverse mapping from Arabic to French
            frenchAxes.forEach((frenchAxe, index) => {
              if (arabicAxes[index]) {
                mapping[arabicAxes[index]] = frenchAxe;
              }
            });
            
            // Convert selected Arabic axes to French
            return selectedAxes.map(axe => mapping[axe] || axe);
          })
        );
      })
    );
  }

  /**
   * Get objectives with both French and Arabic values for dropdown
   * Returns array of objects with both display text and backend value
   */
  getObjectivesWithMapping(selectedAxes: string[]): Observable<{display: string, value: string}[]> {
    // First convert axes to French for backend query
    return this.convertAxesToFrench(selectedAxes).pipe(
      switchMap(frenchAxes => this.getObjectivesWithMappingInternal(frenchAxes))
    );
  }

  private getObjectivesWithMappingInternal(frenchAxes: string[]): Observable<{display: string, value: string}[]> {
    const currentLang = this.translationService.getCurrentLanguage();
    
    if (currentLang === 'ar') {
      // Get both French and Arabic objectives using French axes
      return this.serviceService.findDistinctObjectifsByAxes(frenchAxes).pipe(
        switchMap(frenchObjectifs => {
          console.log('French objectives received:', frenchObjectifs);
          return this.serviceService.findDistinctObjectifsByAxesAr(frenchAxes).pipe(
            map(arabicObjectifs => {
              console.log('Arabic objectives received:', arabicObjectifs);
              // Create mapping objects
              const mappedObjectifs = frenchObjectifs.map((frenchObj, index) => ({
                display: arabicObjectifs[index] || frenchObj, // Show Arabic if available, fallback to French
                value: frenchObj // Always use French for backend
              }));
              console.log('Final mapped objectives:', mappedObjectifs);
              return mappedObjectifs;
            })
          );
        })
      );
    } else {
      // For French, display and value are the same
      return this.serviceService.findDistinctObjectifsByAxes(frenchAxes).pipe(
        map(objectives => objectives.map(obj => ({
          display: obj,
          value: obj
        })))
      );
    }
  }

  /**
   * Transform percentage pie chart data (for filtered pie charts)
   * Structure: { year: { "Réalisé": value, "Reste": value } }
   * Returns object format expected by pie2 component
   */
  transformPercentagePieChartData(percentageData: any): any {
    if (!percentageData) return {};

    const currentLang = this.translationService.getCurrentLanguage();
    
    // Convert percentage data to pie chart format
    const pieDataObject: { [key: string]: number } = {};
    
    for (const [key, value] of Object.entries(percentageData)) {
      if (typeof value === 'object' && value !== null) {
        const dataMap = value as { [key: string]: number };
        
        // Translate the labels
        const realiseLabel = this.translationService.translate('dashboard.pieChartLabels.realise');
        const resteLabel = this.translationService.translate('dashboard.pieChartLabels.reste');
        
        // Create pie chart data object with translated keys
        if (dataMap['Réalisé'] !== undefined) {
          pieDataObject[realiseLabel] = dataMap['Réalisé'];
        }
        if (dataMap['Reste'] !== undefined) {
          pieDataObject[resteLabel] = dataMap['Reste'];
        }
        
        // Only process the first entry for now (can be modified if needed)
        break;
      }
    }
    
    return pieDataObject;
  }
}
