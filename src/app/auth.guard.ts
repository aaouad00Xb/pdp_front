import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  pages: any;
  user: any;
  constructor(private router: Router ){
   

  


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // provides the route configuration options.
   const { routeConfig } = route; 
      // provides the path of the route.
   const { path } = routeConfig as Route; 

  if( !localStorage.getItem("access_token")){

    
    console.log(localStorage.getItem("access_token"))
    this.router.navigate(['']); 
    return false;
  }else{
    return true;
  }
 
 
 
  

 
    
  }
  
}

