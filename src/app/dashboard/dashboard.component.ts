import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  years: number[]=[2022,2023,2024,2025,2026,2027];
  generaldata: any;
  chartsData: any;
  axes: any;
  objectifs: string[];
  piesData: any;
  keys: string[];
  data: any[]=[];
  data6: any;
  data5: any;
  data4: any;
  data3: any;
  data2: any;



constructor(private service:ServiceService){

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
}




getAxces(){
  this.service.axes().subscribe(
    res=> this.axes=res,
    err=>console.error(err)
  )
}


onaxesChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYears = Array.from(target.selectedOptions).map(option => option.value);

  

  if (selectedYears.length === 0) {
    // Handle the case when no regions are selected
    return;
  }

   


  this.service.findDistinctObjectifsByAxes(selectedYears).subscribe(
    res=>{
       
      this.objectifs=res;
          },
    err=>
    console.error(err)
    
  )
  
}


onObjectifsChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYears = Array.from(target.selectedOptions).map(option => option.value);

  

  if (selectedYears.length === 0) {
    // Handle the case when no regions are selected
    return;
  }

   


  this.service.getObjectifPercentageByObjectifs(selectedYears).subscribe(
    res=>{
       
      this.piesData = res
      this.keys = Object.keys(res)
      this.piesData.keys()
          },
    err=>
    console.error(err)
    
  )
  
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
    this.service.getChartData(this.years).subscribe(
      res=>{
        this.chartsData = res
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

}
