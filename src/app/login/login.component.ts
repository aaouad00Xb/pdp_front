import { Component } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
 
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  focus;
  focus1;
  email: any;
  loading: boolean;
  authResponse: any;
  constructor(private service:UserServiceService,private router:Router, private route: ActivatedRoute){
  }

  authenticate(form:NgForm){

    
    this.email = form.value.email 

    if(form.valid){
      this.loading = true;
      this.service.auth(form.value).subscribe(
        res=>{
          this.loading = false;

          this.authResponse = res;

          
          console.log(res)

        
            this.service.setAccesToken(<string>this.authResponse.access_token);
            localStorage.setItem('access_token', res.access_token as string);

            this.router.navigate(['editer']);

          this.loading = false;
  
      },err=>{
        this.loading = false;
        console.log(err)        
  
      })
    }
    this.loading = false;

  }
}
