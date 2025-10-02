import { Component, OnDestroy } from '@angular/core';
import { ServiceService } from '../service.service';
import { LanguageDataService } from '../services/language-data.service';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  years: number[]=[2022,2023,2024,2025,2026,2027];
  generaldata: any;
  chartsData: any;
  axes: any;
  axesWithMapping: {display: string, value: string}[] = [];
  objectifs: string[];
  objectifsWithMapping: {display: string, value: string}[] = [];
  piesData: any;
  keys: string[];
  data: any[]=[];
  data6: any;
  data5: any;
  data4: any;
  data3: any;
  data2: any;
  private subscriptions: Subscription[] = [];
  
  // Cached transformed data
  private _transformedChartData: any = null;
  private _chartLegendLabels: string[] = [];
  private _lastLanguage: string = '';
  
  // Cached chart legends to avoid function calls in template
  public cachedChartLegends: any = {};
  public cachedTransformedPieData: any[] = [];
  public cachedTransformedChartData: any = null;
  public cachedChartLegendLabels: string[] = [];



constructor(
  private service: ServiceService,
  private languageDataService: LanguageDataService,
  private translationService: TranslationService
) {

  // Initialize cached chart legends
  this.cachedChartLegends = this.languageDataService.getChartLegends();

  this.getAxces();
  this.getchartData()
  this.getPDPDataByAnneeRealisation1()
  this.getPDPDataByAnneeRealisation2()
  this.getPDPDataByAnneeRealisation3()
  this.getPDPDataByAnneeRealisation4()
  this.getPDPDataByAnneeRealisation5()
  this.getPDPDataByAnneeRealisation6()
  this.service.getGeneralData().subscribe(
    res=>{
       
      this.generaldata = res
    },
    err=>
    console.error(err)
    
  )

  // Subscribe to language changes to update axes and objectives
  const langSub = this.translationService.currentLanguage$.subscribe(() => {
    this.refreshAllDataForLanguage();
  });
  this.subscriptions.push(langSub);
}




getAxces(){
  this.languageDataService.getAxesWithMapping().subscribe(
    res => {
      this.axesWithMapping = res;
      this.axes = res.map(axe => axe.display); // Keep for backward compatibility
    },
    err=>console.error(err)
  )
}


onaxesChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedAxes = Array.from(target.selectedOptions).map(option => option.value);

  if (selectedAxes.length === 0) {
    // Clear objectives and pie charts when no axes selected
    this.objectifs = [];
    this.piesData = null;
    this.keys = [];
    return;
  }

  // Get objectives for selected axes with mapping for dropdown
  console.log('Selected axes (from dropdown):', selectedAxes);
  this.languageDataService.getObjectivesWithMapping(selectedAxes).subscribe(
    res => {
      console.log('Objectives mapping received:', res);
      this.objectifsWithMapping = res;
      this.objectifs = res.map(obj => obj.display); // Keep for backward compatibility
    },
    err => console.error('Error getting objectives:', err)
  );
}


onObjectifsChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedObjectifs = Array.from(target.selectedOptions).map(option => option.value);

  if (selectedObjectifs.length === 0) {
    // Clear pie charts when no objectives selected
    this.piesData = null;
    this.keys = [];
    return;
  }

  // The selectedObjectifs now contain the French values (from option.value)
  // So we can use them directly for backend query
  console.log('Selected objectives for backend:', selectedObjectifs);
  
  this.service.getObjectifPercentageByObjectifs(selectedObjectifs).subscribe(
    res => {
      this.piesData = res;
      this.keys = Object.keys(res);
      console.log('Pie chart data received:', res);
      console.log('Keys:', this.keys);
    },
    err => console.error(err)
  );
}



  onyearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedYears = Array.from(target.selectedOptions).map(option => Number(option.value));
  
    
  
    if (selectedYears.length === 0) {
      // Handle the case when no regions are selected
      return;
    }
  
     
 
    this.years = selectedYears;
  
    this.getchartData()
    
    
  }

  getchartData(){
    this.service.getChartDataWithArabic(this.years).subscribe(
      res=>{
        this.chartsData = res;
        // Update cached data after chart data changes
        this.updateCachedChartData();
            },
      err=>
      console.error(err)
      
    )
  }

  getPDPDataByAnneeRealisation1(){
    this.service.getPDPDataByAnneeRealisation(2022).subscribe(
      res=>{
        console.error(res)
        this.data =  res;
        },
      err=>
      console.error(err)
      
    )
  }

  getPDPDataByAnneeRealisation2(){
    this.service.getPDPDataByAnneeRealisation(2023).subscribe(
      res=>{
        console.error(res)
        this.data2 =  res;
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation3(){
    this.service.getPDPDataByAnneeRealisation(2024).subscribe(
      res=>{
        console.error(res)
        this.data3 =  res;
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation4(){
    this.service.getPDPDataByAnneeRealisation(2025).subscribe(
      res=>{
        console.error(res)
        this.data4 =  res;
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation5(){
    this.service.getPDPDataByAnneeRealisation(2026).subscribe(
      res=>{
        console.error(res)
        this.data5 =  res;
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation6(){
    this.service.getPDPDataByAnneeRealisation(2027).subscribe(
      res=>{
        console.error(res)
        this.data6 =  res;
        },
      err=>
      console.error(err)
      
    )
  }

  refreshAllDataForLanguage() {
    // Clear cached data
    this._transformedChartData = null;
    this._chartLegendLabels = [];
    this._lastLanguage = this.translationService.getCurrentLanguage();
    
    // Update cached chart legends and data
    this.cachedChartLegends = this.languageDataService.getChartLegends();
    this.updateCachedChartData();
    
    // Clear filtered data that needs to be re-selected
    this.axes = [];
    this.axesWithMapping = [];
    this.objectifs = [];
    this.objectifsWithMapping = [];
    this.piesData = null;
    this.keys = [];
    
    // Re-fetch language-specific data
    this.getAxces();
    this.getchartData();
    
    // Transform existing table data
    this.updateDataForLanguage();
  }

  private updateCachedChartData() {
    // Update cached transformed data
    this.cachedTransformedPieData = this.getTransformedPieData();
    this.cachedTransformedChartData = this.getTransformedChartData();
    this.cachedChartLegendLabels = this.getChartLegendLabels();
  }

  updateDataForLanguage() {
    // Transform existing data to show appropriate language fields
    if (this.data) {
      this.data = this.languageDataService.transformDataForCurrentLanguage(this.data);
    }
    if (this.data2) {
      this.data2 = this.languageDataService.transformDataForCurrentLanguage(this.data2);
    }
    if (this.data3) {
      this.data3 = this.languageDataService.transformDataForCurrentLanguage(this.data3);
    }
    if (this.data4) {
      this.data4 = this.languageDataService.transformDataForCurrentLanguage(this.data4);
    }
    if (this.data5) {
      this.data5 = this.languageDataService.transformDataForCurrentLanguage(this.data5);
    }
    if (this.data6) {
      this.data6 = this.languageDataService.transformDataForCurrentLanguage(this.data6);
    }
  }

  getChartLegends(): any {
    return this.languageDataService.getChartLegends();
  }

  getTransformedPieData(): any[] {
    if (!this.chartsData?.piedata) return [];
    return this.languageDataService.transformPieChartData(this.chartsData.piedata);
  }

  getTransformedPieData2(key: string): any {
    if (!this.piesData || !this.piesData[key]) return {};
    // Use the specific transformation for percentage pie chart data
    return this.languageDataService.transformPercentagePieChartData({ [key]: this.piesData[key] });
  }

  getTranslatedLabel(label: string): string {
    return this.translationService.translate(`strategicAxes.${label}`) || label;
  }

  getTransformedChartData(): any {
    if (!this.chartsData) return null;
    
    const currentLang = this.translationService.getCurrentLanguage();
    if (!this._transformedChartData || this._lastLanguage !== currentLang) {
      this._transformedChartData = this.languageDataService.transformChartData(this.chartsData);
      this._lastLanguage = currentLang;
    }
    
    return this._transformedChartData;
  }

  getChartLegendLabels(): string[] {
    const currentLang = this.translationService.getCurrentLanguage();
    if (this._chartLegendLabels.length === 0 || this._lastLanguage !== currentLang) {
      const transformedData = this.getTransformedChartData();
      if (transformedData && transformedData.dataset) {
        this._chartLegendLabels = transformedData.dataset.map((dataset: any) => dataset.name);
      }
    }
    return this._chartLegendLabels;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
