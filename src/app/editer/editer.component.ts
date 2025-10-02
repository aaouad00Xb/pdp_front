import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent {
  input:any
  data:any=[]
  selectedrow:any
constructor(private service:ServiceService){
  this.gettingData()
}
@ViewChild('exportTable') exportTable: ElementRef<HTMLTableElement>;




exportTableToExcel(): void {

  
  
 
 




  const table = this.exportTable.nativeElement;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

  // Create a new workbook and add the worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Donnée PDP');

 

  // Generate a Blob object containing the workbook
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

  const today = new Date();

  // Array of French month names
  const monthNames = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  // Get the month index (0-based) and retrieve the corresponding French month name
  const monthIndex = today.getMonth();
  const frenchMonth = monthNames[monthIndex];

  // Format the date: YYYY-MM-DD
  const dateFormatted = today.toISOString().slice(0, 10);

  // Construct the file name with the current date and French month
  const fileName = `PDPDATA_${frenchMonth}_${dateFormatted}.xlsx`;

  saveAs(data, fileName);
}


add(){
  this.data.unshift(
    {
      expanded:true,
      annee_realisation: 2022,
axes
: 
"",
cout_estime
: 
0,
 
objectif
: 
"",
part_conseil_prefectoral
: 
0,
part_partenaire
: 
0,
projet_action
: 
"",
realise
: 
0
    }
  )
}


  gettingData(){
this.service.getData().subscribe(res=>{
   
  this.data = res
},err=>{
  console.log(err)
})
  }


  addnew(){
    this.service.createPDP_DATA(this.data[0]).subscribe(res=>{
      Swal.fire({
        title: 'la ligne a été bien ajoutée',
        icon: 'success',
        showCancelButton: true,
  
      })

      this.gettingData()
    },err=>{

      Swal.fire({
        title: 'Veuillez réessayer ultérieurement',
        icon: 'error',
        showCancelButton: true,
  
      })

      console.log(err)
    })
  }

  updaterow(){
this.service.updatePDP_DATA(this.selectedrow.id,this.selectedrow).subscribe(res=>{
   
   
   
  this.gettingData()
},err=>{
  console.log(err)
})
  }


  deleterow(){
    this.service.deletePDP_DATA(this.selectedrow.id).subscribe(res=>{
      Swal.fire({
        title: 'la ligne a été bien suprimée',
        icon: 'success',
        showCancelButton: true,
  
      })
      this.gettingData()

    },err=>{
      Swal.fire({
        title: 'Veuillez réessayer ultérieurement',
        icon: 'error',
        showCancelButton: true,
  
      })
      console.log(err)
    })
  }




  verify(){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        // The user clicked "Oui" (Yes)
        // Call your function for "Oui"
       this.deleterow();
      } else if (result.isDismissed) {
      
      }
    });
    
   
    
  }
  
}
 
