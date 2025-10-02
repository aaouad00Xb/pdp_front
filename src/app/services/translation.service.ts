import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>('fr');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  private translations: { [key: string]: Translation } = {};

  constructor() {
    // Load saved language from localStorage or default to French
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    this.currentLanguageSubject.next(savedLanguage);
    this.loadTranslations();
  }

  private loadTranslations() {
    // French translations
    this.translations['fr'] = {
      // Navigation
      nav: {
        dashboard: 'Tableau de bord',
        editor: 'Éditeur',
        login: 'Connexion',
        logout: 'Déconnexion'
      },
      // Dashboard
      dashboard: {
        title: 'Programme de Développement Préfectoral de Rabat',
        generalStats: 'Statistiques générales',
        totalProjects: 'Total des projets',
        totalBudget: 'Budget total',
        realizedAmount: 'Montant réalisé',
        realizationRate: 'Taux de réalisation',
        byYear: 'Par année',
        byAxes: 'Par axes',
        byObjectives: 'Par objectifs',
        evolution: 'Évolution',
        distribution: 'Distribution',
        globalCost: 'Coût global',
        cpContribution: 'Contr.CP',
        percentage: '%',
        chartLegends: {
          cpContribution: 'Contribution du conseil préfectoral',
          estimatedCost: 'Coût estimé en Mds',
          partnerContribution: 'Contribution des partenaires'
        }
      },
      // Editor
      editor: {
        title: 'Éditeur de données PDP',
        addNew: 'Ajouter nouveau',
        save: 'Enregistrer',
        update: 'Mettre à jour',
        delete: 'Supprimer',
        export: 'Exporter Excel',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette ligne?',
        successAdd: 'La ligne a été bien ajoutée',
        successUpdate: 'La ligne a été bien mise à jour',
        successDelete: 'La ligne a été bien supprimée',
        errorMessage: 'Veuillez réessayer ultérieurement'
      },
      // Form fields
      fields: {
        axes: 'Axes',
        objectif: 'Objectif',
        projetAction: 'Projet/Action',
        coutEstime: 'Coût estimé',
        partConseilPrefectoral: 'Part conseil préfectoral',
        partPartenaire: 'Part partenaire',
        anneeRealisation: 'Année de réalisation',
        realise: 'Réalisé',
        tauxRealisationPhysique: 'Taux de réalisation physique'
      },
      // Login
      login: {
        title: 'Connexion',
        email: 'Email',
        password: 'Mot de passe',
        loginButton: 'Se connecter',
        loading: 'Connexion en cours...'
      },
      // Common
      common: {
        yes: 'Oui',
        no: 'Non',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        warning: 'Attention'
      },
      // Strategic axes (from your data)
      strategicAxes: {
        'RENFORCEMENT DES CAPACITES DU CONSEIL PREFECTORAL': 'Renforcement des capacités du conseil préfectoral',
        'MISE EN ŒUVRE DES PROGRAMMES PREFECTORAUX DE PROPMOTION DE L\'EMPLOI': 'Mise en œuvre des programmes préfectoraux de promotion de l\'emploi',
        'LUTTER CONTRE TOUTES LES FORMES DE PRECARITE SOCIALE': 'Lutter contre toutes les formes de précarité sociale',
        'LES COUPS PARTIS: DES ENGAGEMENTS A RETENIR DANS LE CADRE DU PDP': 'Les coups partis: des engagements à retenir dans le cadre du PDP',
        'REDUIRE LES EFFETS DES DISPARITES TERRITORIALES EN TERME D\'ACCES DES POPULATION AUX INFRASTRUCTURES DE BASE': 'Réduire les effets des disparités territoriales en terme d\'accès des populations aux infrastructures de base',
        'PRESERVATION DU PATRIMOINE ET PROMOTION DU SECTEUR CULTUREL': 'Préservation du patrimoine et promotion du secteur culturel'
      }
    };

    // Arabic translations
    this.translations['ar'] = {
      // Navigation
      nav: {
        dashboard: 'لوحة القيادة',
        editor: 'المحرر',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج'
      },
      // Dashboard
      dashboard: {
        title: 'برنامج التنمية العمالية للرباط',
        generalStats: 'الإحصائيات العامة',
        totalProjects: 'إجمالي المشاريع',
        totalBudget: 'الميزانية الإجمالية',
        realizedAmount: 'المبلغ المحقق',
        realizationRate: 'معدل الإنجاز',
        byYear: 'حسب السنة',
        byAxes: 'حسب المحاور',
        byObjectives: 'حسب الأهداف',
        evolution: 'التطور',
        distribution: 'التوزيع',
        globalCost: 'التكلفة الإجمالية',
        cpContribution: 'مساهمة م.ع',
        percentage: '%',
        chartLegends: {
          cpContribution: 'مساهمة المجلس العمالي',
          estimatedCost: 'التكلفة المقدرة بالمليون درهم',
          partnerContribution: 'مساهمة الشركاء'
        }
      },
      // Editor
      editor: {
        title: 'محرر بيانات مخطط التنمية العمالية',
        addNew: 'إضافة جديد',
        save: 'حفظ',
        update: 'تحديث',
        delete: 'حذف',
        export: 'تصدير إكسل',
        confirmDelete: 'هل أنت متأكد من حذف هذا السطر؟',
        successAdd: 'تم إضافة السطر بنجاح',
        successUpdate: 'تم تحديث السطر بنجاح',
        successDelete: 'تم حذف السطر بنجاح',
        errorMessage: 'يرجى المحاولة مرة أخرى لاحقاً'
      },
      // Form fields
      fields: {
        axes: 'المحاور',
        objectif: 'الهدف',
        projetAction: 'المشروع/العمل',
        coutEstime: 'التكلفة المقدرة',
        partConseilPrefectoral: 'حصة المجلس العمالي',
        partPartenaire: 'حصة الشريك',
        anneeRealisation: 'سنة الإنجاز',
        realise: 'المحقق',
        tauxRealisationPhysique: 'معدل الإنجاز الفيزيائي'
      },
      // Login
      login: {
        title: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        loginButton: 'تسجيل الدخول',
        loading: 'جاري تسجيل الدخول...'
      },
      // Common
      common: {
        yes: 'نعم',
        no: 'لا',
        cancel: 'إلغاء',
        confirm: 'تأكيد',
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        warning: 'تحذير'
      },
      // Strategic axes (Arabic translations)
      strategicAxes: {
        'RENFORCEMENT DES CAPACITES DU CONSEIL PREFECTORAL': 'تعزيز قدرات المجلس العمالي',
        'MISE EN ŒUVRE DES PROGRAMMES PREFECTORAUX DE PROPMOTION DE L\'EMPLOI': 'تنفيذ البرامج العمالية لترقية التشغيل',
        'LUTTER CONTRE TOUTES LES FORMES DE PRECARITE SOCIALE': 'محاربة جميع أشكال الهشاشة الاجتماعية',
        'LES COUPS PARTIS: DES ENGAGEMENTS A RETENIR DANS LE CADRE DU PDP': 'المشاريع المنطلقة: التزامات يجب الاحتفاظ بها في إطار مخطط التنمية العمالية',
        'REDUIRE LES EFFETS DES DISPARITES TERRITORIALES EN TERME D\'ACCES DES POPULATION AUX INFRASTRUCTURES DE BASE': 'تقليل آثار التفاوتات الترابية من حيث وصول السكان إلى البنى التحتية الأساسية',
        'PRESERVATION DU PATRIMOINE ET PROMOTION DU SECTEUR CULTUREL': 'الحفاظ على التراث وترقية القطاع الثقافي'
      }
    };
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
    
    // Update document direction for RTL support
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'fr');
    }
  }

  translate(key: string): string {
    const language = this.getCurrentLanguage();
    const keys = key.split('.');
    let translation: any = this.translations[language];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to French if Arabic translation not found
        translation = this.translations['fr'];
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return typeof translation === 'string' ? translation : key;
  }

  // Observable method for reactive translations
  getTranslation(key: string): Observable<string> {
    return new Observable(observer => {
      const updateTranslation = () => {
        observer.next(this.translate(key));
      };
      
      updateTranslation();
      
      const subscription = this.currentLanguage$.subscribe(() => {
        updateTranslation();
      });
      
      return () => subscription.unsubscribe();
    });
  }
}
