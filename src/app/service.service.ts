import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  private accesTocken = localStorage.getItem("access_token");
  // private  refresh_token= localStorage.getItem("refresh_token");
  private options2 = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };

    public users:any[] =[];
    public profiles:any[] =[];

    
    public setAccesToken(accn:string){
      this.accesTocken = accn;
      this.options2 = {
        headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };
  }

   //private apiUrl = 'http://localhost:80';

    private apiUrl = 'http://localhost:8081';
    // private apiUrl = 'http://10.0.0.3:8080/pdp_back';
    // private apiUrl = 'http://41.137.168.98:1212/pdp_back';

    // private apiUrl = 'https://178.170.116.28/zoneVertsApi';
    // private apiUrl = 'http://178.170.117.197:8090/zoneVertsApi';
    public imagePathBase = '/gestion_espace_vert';
    // public imagePathBase = '../..';


    constructor(private httpClient: HttpClient) {


    }



    public getData():Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/pdp_data`,{
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      })
    }
    public getPDPDataByAnneeRealisation(anneeRealisation):Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/pdp_data/by-year/${anneeRealisation}`)
    }


    public getGeneralData():Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/pdp_data/getGeneralData`)
    }

    public findDistinctObjectifsByAxes(axes: string[]): Observable<string[]> {
      const url = `${this.apiUrl}/pdp_data/objectifs`;
      return this.httpClient.get<string[]>(url, { params: { axes: axes } });
    }

  public findDistinctObjectifsByAxesAr(axesAr: string[]): Observable<string[]> {
    const url = `${this.apiUrl}/pdp_data/objectifs-ar`;
    return this.httpClient.get<string[]>(url, { params: { axesAr: axesAr } });
  }

  public getSumOfCoutEstimeByAxeWithArabic(years: number[]): Observable<any[]> {
    const url = `${this.apiUrl}/pdp_data/getSumOfCoutEstimeByAxeWithArabic`;
    return this.httpClient.post<any[]>(url, years);
  }

    getObjectifPercentageByObjectifs(objectifs: string[]): Observable<any> {
      const url = `${this.apiUrl}/pdp_data/objectif-percentage-by-objectifs`;
      return this.httpClient.get<any>(url, { params: { objectifs: objectifs } });
    }

    public axes():Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/pdp_data/axes`)
    }

    public axesAr():Observable<any>{
      return this.httpClient.get<any>(`${this.apiUrl}/pdp_data/axes-ar`)
    }


    public getChartData(data:any):Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/pdp_data/getChartData`,data)
    }

    public getChartDataWithArabic(data:any):Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/pdp_data/getChartDataWithArabic`,data)
    }
    

    public updatePDP_DATA(id:any,data:any):Observable<any>{
      return this.httpClient.put<any>(`${this.apiUrl}/pdp_data/${id}`,data)
    }
    public createPDP_DATA(data:any):Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/pdp_data`,data)
    }
    
    public deletePDP_DATA(id:any):Observable<any>{
      return this.httpClient.delete<any>(`${this.apiUrl}/pdp_data/${id}`)
    }
    

    

    }

