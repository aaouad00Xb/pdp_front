import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserServiceService  {
 



  // private apiUrl = 'http://localhost:8080';

  private apiUrl='http://localhost:8081';
  
  // private apiUrl = 'http://10.0.0.3:8080/pdp_back';

  // private apiUrl = 'http://41.137.168.98:1212/pdp_back';

  

  public imagePathBase = '../..';
  // public imagePathBase = '/dashbord';

  constructor(private httpClient: HttpClient) { 
  }
  private accesTocken = localStorage.getItem("access_token");
  // private  refresh_token= localStorage.getItem("refresh_token");
  private options2 = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
};

public setAccesToken(accn:string){
  this.accesTocken = accn;
  this.options2 = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
};

}

getAccessToken(){
  return this.accesTocken;
}
  private habilitations:any = []
  private pages:any = []
  private folders:any = []
  // private  options2 = {
  //   headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
  // };


  // buisness(page: number, size: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());
  
  //   return this.httpClient.get<any>(`${this.apiUrl}/businesses`, { params });
  // }
  

  register(data:any){
    return this.httpClient.post<any>(`${this.apiUrl}/api/v1/auth/register`,data);
  }

  auth(data:any){
    return this.httpClient.post<any>(`${this.apiUrl}/api/v1/auth/authenticate`,data);
  }


  getUsersBySelectedRoleAndDivision(role: any, idDive: any) {
    return this.httpClient.get<any>(`${this.apiUrl}/user/getUsersBySelectedRoleAndDivision/${role}/${idDive}`);
  }

  getUsers(){
    return this.httpClient.get<any>(`${this.apiUrl}/user/getUsers`);

  }

  getchefsByDivisionID(divisonID){
    return this.httpClient.get<any>(`${this.apiUrl}/user/getchefsByDivisionID/${divisonID}`);
  }

  public getUser(data:any):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/user/me/${data}`);
  }
  

  
  updateUser(userId: number, userUpdateData: any): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}/update`;
    return this.httpClient.post<any>(url, userUpdateData);
  }  




  toggleUserActiveStatus(userId: number): Observable<string> {
    const url = `${this.apiUrl}/user/${userId}/toggle-active`;
    return this.httpClient.get<string>(url);
  }
  



  
}

