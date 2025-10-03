import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ServiceService } from '../service.service';
import { LanguageDataService } from '../services/language-data.service';
import { TranslationService } from '../services/translation.service';
import { AppSettingsService, AppSettings } from '../services/app-settings.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnDestroy {
  input:any
  data:any=[]
  selectedrow:any
  private subscriptions: Subscription[] = [];
  
  // Filtering properties
  filters = {
    id: '',
    axes: '',
    axes_ar: '',
    objectif: '',
    objectif_ar: '',
    projet_action: '',
    projet_action_ar: '',
    annee_realisation: ''
  };

  // Sorting properties
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // File upload properties
  selectedFile: File | null = null;
  uploading: boolean = false;
  uploadProgress: number = 0;
  uploadStatus: string = '';

  // Tab management
  activeTab: string = 'table';

  // Settings properties
  appSettings: AppSettings = {
    titleFr: 'Programme de Développement Préfectoral de Rabat',
    titleAr: 'برنامج التنمية الإقليمية للرباط',
    leftLogo: 'assets/image.png',
    rightLogo: 'assets/image22.png'
  };

  // Logo management
  selectedLeftLogo: File | null = null;
  selectedRightLogo: File | null = null;
  previewLeftLogo: string | null = null;
  previewRightLogo: string | null = null;

constructor(
  private service: ServiceService,
  private languageDataService: LanguageDataService,
  private translationService: TranslationService,
  private appSettingsService: AppSettingsService
) {
  console.log('EditerComponent constructor called');
  console.log('Initial activeTab:', this.activeTab);
  this.loadSettingsFromService();
  this.gettingData()
  
  // Subscribe to language changes to update data display
  const langSub = this.translationService.currentLanguage$.subscribe(() => {
    this.updateDataForLanguage();
  });
  this.subscriptions.push(langSub);

  // Subscribe to settings changes
  const settingsSub = this.appSettingsService.settings$.subscribe(settings => {
    this.appSettings = settings;
  });
  this.subscriptions.push(settingsSub);
}
@ViewChild('exportTable') exportTable: ElementRef<HTMLTableElement>;




exportTableToExcel(): void {

  
  
 
 




  try {
    // Check if table reference exists
    if (!this.exportTable || !this.exportTable.nativeElement) {
      Swal.fire({
        title: 'Erreur d\'export',
        text: 'Impossible de trouver le tableau à exporter',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Check if there's data to export
    if (!this.data || this.data.length === 0) {
      Swal.fire({
        title: 'Aucune donnée',
        text: 'Il n\'y a aucune donnée à exporter',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Show loading message
    Swal.fire({
      title: 'Export en cours...',
      text: 'Génération du fichier Excel',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

  const table = this.exportTable.nativeElement;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

  // Create a new workbook and add the worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Donnée PDP');

  // Generate a Blob object containing the workbook
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' 
    });

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

    // Save the file
  saveAs(data, fileName);

    // Close loading and show success
    Swal.close();
    Swal.fire({
      title: 'Export réussi!',
      text: `Le fichier "${fileName}" a été téléchargé avec succès`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

  } catch (error) {
    console.error('Export error:', error);
    Swal.close();
    Swal.fire({
      title: 'Erreur d\'export',
      text: 'Une erreur est survenue lors de l\'export. Veuillez réessayer.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


add(){
  this.data.unshift(
    {
      expanded: true,
      annee_realisation: 2022,
      axes: "",
      axes_ar: "",
      objectif: "",
      objectif_ar: "",
      projet_action: "",
      projet_action_ar: "",
      cout_estime: 0,
      part_conseil_prefectoral: 0,
      part_partenaire: 0,
      realise: 0,
      taux_realisation_physique: 0
    }
  )
}


  gettingData(){
    console.log('Getting data...');
this.service.getData().subscribe(res=>{
      console.log('Data received:', res);
      this.data = this.languageDataService.transformDataForCurrentLanguage(res);
      console.log('Transformed data:', this.data);
},err=>{
      console.log('Error getting data:', err)
})
  }


  addnew(){
    this.service.createPDP_DATA(this.data[0]).subscribe(res=>{
      Swal.fire({
        title: 'Succès!',
        text: 'La ligne a été ajoutée avec succès',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      this.gettingData()
    },err=>{
      Swal.fire({
        title: 'Erreur',
        text: 'Erreur lors de l\'ajout de la ligne. Veuillez réessayer ultérieurement.',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      console.log(err)
    })
  }

  updaterow(){
this.service.updatePDP_DATA(this.selectedrow.id,this.selectedrow).subscribe(res=>{
      Swal.fire({
        title: 'Mise à jour réussie!',
        text: 'La ligne a été mise à jour avec succès',
        icon: 'success',
        confirmButtonText: 'OK'
      })
   
  this.gettingData()
},err=>{
      Swal.fire({
        title: 'Erreur de mise à jour',
        text: 'Erreur lors de la mise à jour de la ligne. Veuillez réessayer ultérieurement.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  console.log(err)
})
  }


  deleterow(){
    this.service.deletePDP_DATA(this.selectedrow.id).subscribe(res=>{
      Swal.fire({
        title: 'Suppression réussie!',
        text: 'La ligne a été supprimée avec succès',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.gettingData()

    },err=>{
      Swal.fire({
        title: 'Erreur de suppression',
        text: 'Erreur lors de la suppression de la ligne. Veuillez réessayer ultérieurement.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      console.log(err)
    })
  }




  verify(){
    Swal.fire({
      title: 'Confirmer la suppression',
      text: 'Êtes-vous sûr de vouloir supprimer cette ligne ? Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
       this.deleterow();
      }
    });
  }

  updateDataForLanguage() {
    if (this.data) {
      this.data = this.languageDataService.transformDataForCurrentLanguage(this.data);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Get all filtered and sorted data (for pagination info)
  getAllFilteredData(): any[] {
    if (!this.data) return [];
    
    let filteredData = this.data.filter(item => {
      return (
        (!this.filters.id || item.id?.toString().toLowerCase().includes(this.filters.id.toLowerCase())) &&
        (!this.filters.axes || item.axes?.toLowerCase().includes(this.filters.axes.toLowerCase())) &&
        (!this.filters.axes_ar || item.axes_ar?.toLowerCase().includes(this.filters.axes_ar.toLowerCase())) &&
        (!this.filters.objectif || item.objectif?.toLowerCase().includes(this.filters.objectif.toLowerCase())) &&
        (!this.filters.objectif_ar || item.objectif_ar?.toLowerCase().includes(this.filters.objectif_ar.toLowerCase())) &&
        (!this.filters.projet_action || item.projet_action?.toLowerCase().includes(this.filters.projet_action.toLowerCase())) &&
        (!this.filters.projet_action_ar || item.projet_action_ar?.toLowerCase().includes(this.filters.projet_action_ar.toLowerCase())) &&
        (!this.filters.annee_realisation || item.annee_realisation?.toString() === this.filters.annee_realisation)
      );
    });

    // Apply sorting if a column is selected
    if (this.sortColumn) {
      filteredData.sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        let comparison = 0;
        if (typeof aVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else {
          comparison = aVal - bVal;
        }
        
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filteredData;
  }

  // Get paginated data for display
  getFilteredData(): any[] {
    const allData = this.getAllFilteredData();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return allData.slice(startIndex, endIndex);
  }

  // Clear all filters
  clearFilters(): void {
    this.filters = {
      id: '',
      axes: '',
      axes_ar: '',
      objectif: '',
      objectif_ar: '',
      projet_action: '',
      projet_action_ar: '',
      annee_realisation: ''
    };
    this.currentPage = 1; // Reset to first page when clearing filters
  }

  // Sorting method
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1; // Reset to first page when sorting
  }

  // Get sort icon
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'bi-arrow-down-up';
    }
    return this.sortDirection === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  // Pagination methods
  getTotalPages(): number {
    const totalItems = this.getAllFilteredData().length;
    return Math.ceil(totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const totalItems = this.getAllFilteredData().length;
    const endIndex = this.currentPage * this.itemsPerPage;
    return Math.min(endIndex, totalItems);
  }

  // File upload methods
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
        Swal.fire({
          title: 'Format de fichier invalide',
          text: 'Veuillez sélectionner un fichier Excel (.xlsx ou .xls)',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: 'Fichier trop volumineux',
          text: 'Le fichier est trop volumineux. Taille maximale: 10MB',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
      
      this.selectedFile = file;
      this.uploadProgress = 0;
      this.uploadStatus = '';
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploadStatus = '';
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    Swal.fire({
      title: 'Confirmer l\'import',
      text: `Êtes-vous sûr de vouloir importer le fichier "${this.selectedFile.name}" ? Cette action ajoutera les données à la base de données.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, importer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performUpload();
      }
    });
  }

  private performUpload(): void {
    this.uploading = true;
    this.uploadProgress = 0;
    this.uploadStatus = 'Préparation du fichier...';

    const formData = new FormData();
    formData.append('file', this.selectedFile!);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += 10;
        this.uploadStatus = 'Téléchargement en cours...';
      }
    }, 200);

    this.service.uploadExcelFile(formData).subscribe({
      next: (response) => {
        clearInterval(progressInterval);
        this.uploadProgress = 100;
        this.uploadStatus = 'Import terminé avec succès!';
        this.uploading = false;
        
        // Refresh data
        this.gettingData();
        
        // Clear file after successful upload
        setTimeout(() => {
          this.clearFile();
        }, 2000);
        
        Swal.fire({
          title: 'Import réussi!',
          text: `Fichier importé avec succès! ${response.recordsProcessed} enregistrements traités.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        clearInterval(progressInterval);
        this.uploading = false;
        this.uploadProgress = 0;
        this.uploadStatus = 'Erreur lors de l\'import';
        console.error('Upload error:', error);
        Swal.fire({
          title: 'Erreur d\'import',
          text: 'Erreur lors de l\'import du fichier. Vérifiez le format et réessayez.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  downloadTemplate(): void {
    this.service.downloadExcelTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'modele_pdp_data.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
        
        Swal.fire({
          title: 'Téléchargement réussi!',
          text: 'Le modèle Excel a été téléchargé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Template download error:', error);
        Swal.fire({
          title: 'Erreur de téléchargement',
          text: 'Erreur lors du téléchargement du modèle',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Settings methods
  getCurrentTitle(): string {
    const currentLang = this.translationService.getCurrentLanguage();
    return currentLang === 'ar' ? this.appSettings.titleAr : this.appSettings.titleFr;
  }

  get currentLeftLogo(): string {
    return this.previewLeftLogo || this.appSettings.leftLogo;
  }

  get currentRightLogo(): string {
    return this.previewRightLogo || this.appSettings.rightLogo;
  }

  onLeftLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Fichier invalide',
          text: 'Veuillez sélectionner un fichier image valide',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Fichier trop volumineux',
          text: 'La taille du fichier ne doit pas dépasser 5MB',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      this.selectedLeftLogo = file;
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewLeftLogo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRightLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Fichier invalide',
          text: 'Veuillez sélectionner un fichier image valide',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Fichier trop volumineux',
          text: 'La taille du fichier ne doit pas dépasser 5MB',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      this.selectedRightLogo = file;
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewRightLogo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadLeftLogo(): void {
    if (!this.selectedLeftLogo) return;

    Swal.fire({
      title: 'Confirmer la mise à jour',
      text: 'Voulez-vous vraiment changer le logo principal?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, changer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performLogoUpload(this.selectedLeftLogo!, 'left');
      }
    });
  }

  uploadRightLogo(): void {
    if (!this.selectedRightLogo) return;

    Swal.fire({
      title: 'Confirmer la mise à jour',
      text: 'Voulez-vous vraiment changer le logo secondaire?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, changer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performLogoUpload(this.selectedRightLogo!, 'right');
      }
    });
  }

  private performLogoUpload(file: File, position: 'left' | 'right'): void {
    Swal.fire({
      title: 'Upload en cours...',
      text: 'Téléchargement du logo',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // For now, we'll simulate the upload and save using the service
    // In a real application, you would call a backend service
    setTimeout(() => {
      try {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const logoUrl = e.target.result;
          
          // Update the logo using the service
          if (position === 'left') {
            this.appSettingsService.updateLeftLogo(logoUrl);
            this.selectedLeftLogo = null;
            this.previewLeftLogo = null;
          } else {
            this.appSettingsService.updateRightLogo(logoUrl);
            this.selectedRightLogo = null;
            this.previewRightLogo = null;
          }

          Swal.close();
          Swal.fire({
            title: 'Logo mis à jour!',
            text: `Le logo ${position === 'left' ? 'principal' : 'secondaire'} a été mis à jour avec succès`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        Swal.close();
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur lors de la mise à jour du logo',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }, 1500);
  }

  saveAppSettings(): void {
    Swal.fire({
      title: 'Confirmer la sauvegarde',
      text: 'Voulez-vous sauvegarder les paramètres de l\'application?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, sauvegarder',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Update settings using the service
          this.appSettingsService.updateTitle(this.appSettings.titleFr, this.appSettings.titleAr);

          Swal.fire({
            title: 'Paramètres sauvegardés!',
            text: 'Les paramètres de l\'application ont été sauvegardés avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (error) {
          Swal.fire({
            title: 'Erreur de sauvegarde',
            text: 'Erreur lors de la sauvegarde des paramètres',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }

  resetToDefaults(): void {
    Swal.fire({
      title: 'Confirmer la réinitialisation',
      text: 'Cette action restaurera tous les paramètres par défaut. Continuer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, réinitialiser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset using the service
        this.appSettingsService.resetToDefaults();
        
        // Clear preview states
        this.selectedLeftLogo = null;
        this.selectedRightLogo = null;
        this.previewLeftLogo = null;
        this.previewRightLogo = null;

        Swal.fire({
          title: 'Réinitialisation terminée!',
          text: 'Tous les paramètres ont été restaurés aux valeurs par défaut',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  private loadSettingsFromService(): void {
    // Settings will be loaded automatically through the service subscription
    this.appSettings = this.appSettingsService.getCurrentSettings();
  }
}
 
