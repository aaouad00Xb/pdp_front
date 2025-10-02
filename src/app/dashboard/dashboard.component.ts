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
  
  // Filtered data arrays based on selected years
  filteredDataByYear: { [year: number]: any[] } = {};
  
  // Filtered general data for charts only (not summary cards)
  filteredGeneralData: any;
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
  this.getGeneralData() // Use original method for summary cards
  this.getPDPDataByAnneeRealisation1()
  this.getPDPDataByAnneeRealisation2()
  this.getPDPDataByAnneeRealisation3()
  this.getPDPDataByAnneeRealisation4()
  this.getPDPDataByAnneeRealisation5()
  this.getPDPDataByAnneeRealisation6()

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
  this.languageDataService.getObjectivesWithMapping(selectedAxes).subscribe(
    res => {
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
  
    // Update only chart data when years change (not tables)
    this.getchartData();
    this.getGeneralDataByYears(); // Only for the bar chart data
  }

  getGeneralData() {
    this.service.getGeneralData().subscribe(
      res => {
        this.generaldata = res;
      },
      err => console.error(err)
    );
  }

  getGeneralDataByYears() {
    this.service.getGeneralDataByYears(this.years).subscribe(
      res => {
        this.filteredGeneralData = res; // Store filtered data separately for charts
      },
      err => console.error(err)
    );
  }

  // Load data for all selected years
  loadDataForSelectedYears() {
    // Clear existing filtered data
    this.filteredDataByYear = {};
    
    // Load data for each selected year
    this.years.forEach(year => {
      this.service.getPDPDataByAnneeRealisation(year).subscribe(
        res => {
          this.filteredDataByYear[year] = this.languageDataService.transformDataForCurrentLanguage(res);
        },
        err => console.error(`Error loading data for year ${year}:`, err)
      );
    });
  }

  // Getter methods for filtered data by year
  get filteredData2022() { return this.years.includes(2022) ? this.filteredDataByYear[2022] || [] : []; }
  get filteredData2023() { return this.years.includes(2023) ? this.filteredDataByYear[2023] || [] : []; }
  get filteredData2024() { return this.years.includes(2024) ? this.filteredDataByYear[2024] || [] : []; }
  get filteredData2025() { return this.years.includes(2025) ? this.filteredDataByYear[2025] || [] : []; }
  get filteredData2026() { return this.years.includes(2026) ? this.filteredDataByYear[2026] || [] : []; }
  get filteredData2027() { return this.years.includes(2027) ? this.filteredDataByYear[2027] || [] : []; }

  // Check if a year is selected
  isYearSelected(year: number): boolean {
    return this.years.includes(year);
  }

  getchartData(){
    this.service.getChartDataWithArabic(this.years).subscribe(
      res=>{
        this.chartsData = res;
        // Clear cache when chart data changes
        this._transformedChartData = null;
        this._chartLegendLabels = [];
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
        this.data = this.languageDataService.transformDataForCurrentLanguage(res);
        },
      err=>
      console.error(err)
      
    )
  }

  getPDPDataByAnneeRealisation2(){
    this.service.getPDPDataByAnneeRealisation(2023).subscribe(
      res=>{
        console.error(res)
        this.data2 = this.languageDataService.transformDataForCurrentLanguage(res);
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation3(){
    this.service.getPDPDataByAnneeRealisation(2024).subscribe(
      res=>{
        console.error(res)
        this.data3 = this.languageDataService.transformDataForCurrentLanguage(res);
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation4(){
    this.service.getPDPDataByAnneeRealisation(2025).subscribe(
      res=>{
        console.error(res)
        this.data4 = this.languageDataService.transformDataForCurrentLanguage(res);
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation5(){
    this.service.getPDPDataByAnneeRealisation(2026).subscribe(
      res=>{
        console.error(res)
        this.data5 = this.languageDataService.transformDataForCurrentLanguage(res);
        },
      err=>
      console.error(err)
      
    )
  }
  getPDPDataByAnneeRealisation6(){
    this.service.getPDPDataByAnneeRealisation(2027).subscribe(
      res=>{
        console.error(res)
        this.data6 = this.languageDataService.transformDataForCurrentLanguage(res);
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
    this.getGeneralDataByYears(); // Also refresh filtered chart data
    
    // Re-fetch table data with new language
    this.getPDPDataByAnneeRealisation1();
    this.getPDPDataByAnneeRealisation2();
    this.getPDPDataByAnneeRealisation3();
    this.getPDPDataByAnneeRealisation4();
    this.getPDPDataByAnneeRealisation5();
    this.getPDPDataByAnneeRealisation6();
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
