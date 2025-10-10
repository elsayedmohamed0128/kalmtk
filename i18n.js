import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Original translations
      'write_your_idea': 'Write your idea',
      'start': 'Start',
      'voice_input': 'Voice Input',
      'stop_listening': 'Stop Listening',
      'generated_prompt': 'Generated Prompt',
      'copy': 'Copy',
      'save': 'Save',
      'share': 'Share',
      
      // Navigation
      'navigation': {
        'home': 'Home',
        'history': 'History',
        'settings': 'Settings'
      },
      
      // Signup
      'signup': {
        'title': 'Create Account',
        'subtitle': 'Join us to start creating amazing prompts',
        'nameLabel': 'Full Name',
        'namePlaceholder': 'Enter your full name',
        'emailLabel': 'Email Address',
        'emailPlaceholder': 'Enter your email',
        'passwordLabel': 'Password',
        'passwordPlaceholder': 'Create a password',
        'passwordHint': 'At least 8 characters with numbers and letters',
        'confirmPasswordLabel': 'Confirm Password',
        'confirmPasswordPlaceholder': 'Re-enter your password',
        'signupButton': 'Sign Up',
        'signingUp': 'Signing Up...',
        'alreadyHaveAccount': 'Already have an account?',
        'loginLink': 'Log In',
        'nameRequired': 'Name is required',
        'emailRequired': 'Email is required',
        'invalidEmail': 'Please enter a valid email',
        'passwordRequired': 'Password is required',
        'weakPassword': 'Password must be at least 8 characters',
        'passwordsDoNotMatch': 'Passwords do not match',
        'success': 'Account created successfully!',
        'failed': 'Failed to create account. Please try again.'
      },
      
      // Login
      'login': {
        'title': 'Welcome Back',
        'subtitle': 'Sign in to continue',
        'emailLabel': 'Email Address',
        'emailPlaceholder': 'Enter your email',
        'passwordLabel': 'Password',
        'passwordPlaceholder': 'Enter your password',
        'loginButton': 'Log In',
        'loggingIn': 'Logging In...',
        'forgotPassword': 'Forgot Password?',
        'noAccount': "Don't have an account?",
        'signupLink': 'Sign Up',
        'invalidCredentials': 'Invalid email or password',
        'failed': 'Login failed. Please try again.'
      },
      
      // History
      'history': {
        'title': 'History',
        'emptyMessage': 'No prompt history yet. Create your first prompt to get started!',
        'refresh': 'Refresh',
        'loadFailed': 'Failed to load history',
        'detail': {
          'title': 'Prompt Details',
          'notFound': 'Prompt not found',
          'backToHistory': 'Back to History',
          'untitled': 'Untitled Prompt'
        }
      },
      
      // Settings
      'settings': {
        'title': 'Settings',
        'logout': 'Log Out',
        'logoutConfirmTitle': 'Log Out',
        'logoutConfirmMessage': 'Are you sure you want to log out?',
        'profile': {
          'title': 'Profile',
          'edit': 'Edit',
          'personalInfo': 'Personal Information',
          'name': 'Name',
          'email': 'Email',
          'notSet': 'Not set',
          'accountInfo': 'Account Information',
          'memberSince': 'Member Since',
          'lastLogin': 'Last Login',
          'notAvailable': 'Not available',
          'updateSuccess': 'Profile updated successfully',
          'updateFailed': 'Failed to update profile'
        },
        'preferences': {
          'title': 'Preferences',
          'display': 'Display',
          'darkMode': 'Dark Mode',
          'autoSave': 'Auto Save Prompts',
          'notifications': 'Notifications',
          'enableNotifications': 'Enable Notifications',
          'language': 'Language',
          'saveSuccess': 'Preferences saved successfully'
        },
        'account': {
          'title': 'Account',
          'changePassword': 'Change Password',
          'privacy': 'Privacy Settings'
        },
        'dangerZone': {
          'title': 'Danger Zone',
          'deleteAccount': 'Delete Account'
        }
      },
      
      // Admin
      'admin': {
        'dashboard': {
          'title': 'Admin Dashboard',
          'overview': 'System Overview',
          'users': 'Users',
          'prompts': 'Prompts',
          'models': 'AI Models',
          'management': 'Management',
          'manageUsers': 'Manage Users',
          'manageModels': 'Manage AI Models',
          'manageTrainingData': 'Manage Training Data',
          'viewLogs': 'View System Logs',
          'actions': 'System Actions',
          'backup': 'Backup System',
          'maintenance': 'Maintenance Mode',
          'restartServices': 'Restart Services',
          'loadFailed': 'Failed to load dashboard data',
          'health': {
            'title': 'System Health',
            'good': 'Good',
            'warning': 'Warning',
            'critical': 'Critical'
          }
        },
        'models': {
          'title': 'AI Model Management',
          'name': 'Model Name',
          'provider': 'Provider',
          'version': 'Version',
          'noVersion': 'No version specified',
          'addModel': 'Add Model',
          'addNewModel': 'Add New AI Model',
          'cancelAdd': 'Cancel',
          'activate': 'Activate',
          'deactivate': 'Deactivate',
          'namePlaceholder': 'e.g., GPT-4, Claude 2',
          'providerPlaceholder': 'e.g., OpenAI, Anthropic',
          'versionPlaceholder': 'e.g., 4.0, 2.1',
          'nameAndProviderRequired': 'Name and provider are required',
          'addSuccess': 'Model added successfully',
          'addFailed': 'Failed to add model',
          'updateFailed': 'Failed to update model',
          'deleteConfirmTitle': 'Delete Model',
          'deleteConfirmMessage': 'Are you sure you want to delete this model? This action cannot be undone.',
          'deleteSuccess': 'Model deleted successfully',
          'deleteFailed': 'Failed to delete model',
          'loadFailed': 'Failed to load models',
          'noModels': 'No AI models configured yet'
        },
        'trainingData': {
          'title': 'Training Data Management',
          'prompt': 'Prompt',
          'response': 'Response',
          'category': 'Category',
          'uncategorized': 'Uncategorized',
          'addData': 'Add Training Data',
          'addNewData': 'Add New Training Data',
          'cancelAdd': 'Cancel',
          'promptPlaceholder': 'Enter the prompt example',
          'responsePlaceholder': 'Enter the expected response',
          'categoryPlaceholder': 'Optional category',
          'promptAndResponseRequired': 'Prompt and response are required',
          'addSuccess': 'Training data added successfully',
          'addFailed': 'Failed to add training data',
          'deleteConfirmTitle': 'Delete Training Data',
          'deleteConfirmMessage': 'Are you sure you want to delete this training data? This action cannot be undone.',
          'deleteSuccess': 'Training data deleted successfully',
          'deleteFailed': 'Failed to delete training data',
          'loadFailed': 'Failed to load training data',
          'noData': 'No training data available'
        }
      },
      
      // General
      'languages': {
        'en': 'English',
        'ar': 'العربية',
        'de': 'Deutsch'
      },
      'success': 'Success',
      'error': 'Error',
      'cancel': 'Cancel',
      'delete': 'Delete',
      'saving': 'Saving...',
      'save': 'Save'
    }
  },
  ar: {
    translation: {
      // Original translations
      'write_your_idea': 'اكتب فكرتك',
      'start': 'ابدأ',
      'voice_input': 'إدخال صوتي',
      'stop_listening': 'توقف عن الاستماع',
      'generated_prompt': 'المطالبة المولدة',
      'copy': 'نسخ',
      'save': 'حفظ',
      'share': 'مشاركة',
      
      // Navigation
      'navigation': {
        'home': 'الرئيسية',
        'history': 'السجل',
        'settings': 'الإعدادات'
      },
      
      // Signup
      'signup': {
        'title': 'إنشاء حساب',
        'subtitle': 'انضم إلينا لبدء إنشاء مطالبات رائعة',
        'nameLabel': 'الاسم الكامل',
        'namePlaceholder': 'أدخل اسمك الكامل',
        'emailLabel': 'عنوان البريد الإلكتروني',
        'emailPlaceholder': 'أدخل بريدك الإلكتروني',
        'passwordLabel': 'كلمة المرور',
        'passwordPlaceholder': 'أنشئ كلمة مرور',
        'passwordHint': '8 أحرف على الأقل مع أرقام وحروف',
        'confirmPasswordLabel': 'تأكيد كلمة المرور',
        'confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
        'signupButton': 'التسجيل',
        'signingUp': 'جارٍ التسجيل...',
        'alreadyHaveAccount': 'هل لديك حساب بالفعل؟',
        'loginLink': 'تسجيل الدخول',
        'nameRequired': 'الاسم مطلوب',
        'emailRequired': 'البريد الإلكتروني مطلوب',
        'invalidEmail': 'يرجى إدخال بريد إلكتروني صحيح',
        'passwordRequired': 'كلمة المرور مطلوبة',
        'weakPassword': 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
        'passwordsDoNotMatch': 'كلمات المرور غير متطابقة',
        'success': 'تم إنشاء الحساب بنجاح!',
        'failed': 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.'
      },
      
      // Login
      'login': {
        'title': 'مرحبًا بعودتك',
        'subtitle': 'سجل دخولك للمتابعة',
        'emailLabel': 'عنوان البريد الإلكتروني',
        'emailPlaceholder': 'أدخل بريدك الإلكتروني',
        'passwordLabel': 'كلمة المرور',
        'passwordPlaceholder': 'أدخل كلمة المرور',
        'loginButton': 'تسجيل الدخول',
        'loggingIn': 'جارٍ تسجيل الدخول...',
        'forgotPassword': 'نسيت كلمة المرور؟',
        'noAccount': 'ليس لديك حساب؟',
        'signupLink': 'التسجيل',
        'invalidCredentials': 'بريد إلكتروني أو كلمة مرور غير صحيحة',
        'failed': 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.'
      },
      
      // History
      'history': {
        'title': 'السجل',
        'emptyMessage': 'لا يوجد سجل مطالبات بعد. أنشئ مطلبك الأول للبدء!',
        'refresh': 'تحديث',
        'loadFailed': 'فشل تحميل السجل',
        'detail': {
          'title': 'تفاصيل المطلب',
          'notFound': 'المطلب غير موجود',
          'backToHistory': 'العودة إلى السجل',
          'untitled': 'مطلب بدون عنوان'
        }
      },
      
      // Settings
      'settings': {
        'title': 'الإعدادات',
        'logout': 'تسجيل الخروج',
        'logoutConfirmTitle': 'تسجيل الخروج',
        'logoutConfirmMessage': 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
        'profile': {
          'title': 'الملف الشخصي',
          'edit': 'تعديل',
          'personalInfo': 'المعلومات الشخصية',
          'name': 'الاسم',
          'email': 'البريد الإلكتروني',
          'notSet': 'غير محدد',
          'accountInfo': 'معلومات الحساب',
          'memberSince': 'عضو منذ',
          'lastLogin': 'آخر تسجيل دخول',
          'notAvailable': 'غير متوفر',
          'updateSuccess': 'تم تحديث الملف الشخصي بنجاح',
          'updateFailed': 'فشل تحديث الملف الشخصي'
        },
        'preferences': {
          'title': 'التفضيلات',
          'display': 'العرض',
          'darkMode': 'الوضع الداكن',
          'autoSave': 'حفظ المطالبات تلقائيًا',
          'notifications': 'الإشعارات',
          'enableNotifications': 'تمكين الإشعارات',
          'language': 'اللغة',
          'saveSuccess': 'تم حفظ التفضيلات بنجاح'
        },
        'account': {
          'title': 'الحساب',
          'changePassword': 'تغيير كلمة المرور',
          'privacy': 'إعدادات الخصوصية'
        },
        'dangerZone': {
          'title': 'منطقة الخطر',
          'deleteAccount': 'حذف الحساب'
        }
      },
      
      // Admin
      'admin': {
        'dashboard': {
          'title': 'لوحة التحكم الإدارية',
          'overview': 'نظرة عامة على النظام',
          'users': 'المستخدمون',
          'prompts': 'المطالبات',
          'models': 'نماذج الذكاء الاصطناعي',
          'management': 'الإدارة',
          'manageUsers': 'إدارة المستخدمين',
          'manageModels': 'إدارة نماذج الذكاء الاصطناعي',
          'manageTrainingData': 'إدارة بيانات التدريب',
          'viewLogs': 'عرض سجلات النظام',
          'actions': 'إجراءات النظام',
          'backup': 'نسخ احتياطي للنظام',
          'maintenance': 'وضع الصيانة',
          'restartServices': 'إعادة تشغيل الخدمات',
          'loadFailed': 'فشل تحميل بيانات لوحة التحكم',
          'health': {
            'title': 'حالة النظام',
            'good': 'جيد',
            'warning': 'تحذير',
            'critical': 'حرج'
          }
        },
        'models': {
          'title': 'إدارة نماذج الذكاء الاصطناعي',
          'name': 'اسم النموذج',
          'provider': 'المزود',
          'version': 'الإصدار',
          'noVersion': 'لا يوجد إصدار محدد',
          'addModel': 'إضافة نموذج',
          'addNewModel': 'إضافة نموذج ذكاء اصطناعي جديد',
          'cancelAdd': 'إلغاء',
          'activate': 'تفعيل',
          'deactivate': 'تعطيل',
          'namePlaceholder': 'مثال: GPT-4, Claude 2',
          'providerPlaceholder': 'مثال: OpenAI, Anthropic',
          'versionPlaceholder': 'مثال: 4.0, 2.1',
          'nameAndProviderRequired': 'الاسم والمزود مطلوبان',
          'addSuccess': 'تمت إضافة النموذج بنجاح',
          'addFailed': 'فشل إضافة النموذج',
          'updateFailed': 'فشل تحديث النموذج',
          'deleteConfirmTitle': 'حذف النموذج',
          'deleteConfirmMessage': 'هل أنت متأكد أنك تريد حذف هذا النموذج؟ لا يمكن التراجع عن هذا الإجراء.',
          'deleteSuccess': 'تم حذف النموذج بنجاح',
          'deleteFailed': 'فشل حذف النموذج',
          'loadFailed': 'فشل تحميل النماذج',
          'noModels': 'لم يتم تكوين نماذج ذكاء اصطناعي بعد'
        },
        'trainingData': {
          'title': 'إدارة بيانات التدريب',
          'prompt': 'المطلب',
          'response': 'الاستجابة',
          'category': 'الفئة',
          'uncategorized': 'غير مصنف',
          'addData': 'إضافة بيانات تدريب',
          'addNewData': 'إضافة بيانات تدريب جديدة',
          'cancelAdd': 'إلغاء',
          'promptPlaceholder': 'أدخل مثال المطلب',
          'responsePlaceholder': 'أدخل الاستجابة المتوقعة',
          'categoryPlaceholder': 'فئة اختيارية',
          'promptAndResponseRequired': 'المطلب والاستجابة مطلوبان',
          'addSuccess': 'تمت إضافة بيانات التدريب بنجاح',
          'addFailed': 'فشل إضافة بيانات التدريب',
          'deleteConfirmTitle': 'حذف بيانات التدريب',
          'deleteConfirmMessage': 'هل أنت متأكد أنك تريد حذف بيانات التدريب هذه؟ لا يمكن التراجع عن هذا الإجراء.',
          'deleteSuccess': 'تم حذف بيانات التدريب بنجاح',
          'deleteFailed': 'فشل حذف بيانات التدريب',
          'loadFailed': 'فشل تحميل بيانات التدريب',
          'noData': 'لا توجد بيانات تدريب متاحة'
        }
      },
      
      // General
      'languages': {
        'en': 'English',
        'ar': 'العربية',
        'de': 'Deutsch'
      },
      'success': 'نجاح',
      'error': 'خطأ',
      'cancel': 'إلغاء',
      'delete': 'حذف',
      'saving': 'جارٍ الحفظ...',
      'save': 'حفظ'
    }
  },
  de: {
    translation: {
      // Original translations
      'write_your_idea': 'Schreiben Sie Ihre Idee',
      'start': 'Start',
      'voice_input': 'Spracheingabe',
      'stop_listening': 'Aufhören zuzuhören',
      'generated_prompt': 'Generierte Eingabeaufforderung',
      'copy': 'Kopieren',
      'save': 'Speichern',
      'share': 'Teilen',
      
      // Navigation
      'navigation': {
        'home': 'Startseite',
        'history': 'Verlauf',
        'settings': 'Einstellungen'
      },
      
      // Signup
      'signup': {
        'title': 'Konto erstellen',
        'subtitle': 'Treten Sie uns bei, um beeindruckende Prompts zu erstellen',
        'nameLabel': 'Vollständiger Name',
        'namePlaceholder': 'Geben Sie Ihren vollständigen Namen ein',
        'emailLabel': 'E-Mail-Adresse',
        'emailPlaceholder': 'Geben Sie Ihre E-Mail ein',
        'passwordLabel': 'Passwort',
        'passwordPlaceholder': 'Erstellen Sie ein Passwort',
        'passwordHint': 'Mindestens 8 Zeichen mit Zahlen und Buchstaben',
        'confirmPasswordLabel': 'Passwort bestätigen',
        'confirmPasswordPlaceholder': 'Geben Sie Ihr Passwort erneut ein',
        'signupButton': 'Registrieren',
        'signingUp': 'Registrierung läuft...',
        'alreadyHaveAccount': 'Haben Sie bereits ein Konto?',
        'loginLink': 'Anmelden',
        'nameRequired': 'Name ist erforderlich',
        'emailRequired': 'E-Mail ist erforderlich',
        'invalidEmail': 'Bitte geben Sie eine gültige E-Mail ein',
        'passwordRequired': 'Passwort ist erforderlich',
        'weakPassword': 'Passwort muss mindestens 8 Zeichen haben',
        'passwordsDoNotMatch': 'Passwörter stimmen nicht überein',
        'success': 'Konto erfolgreich erstellt!',
        'failed': 'Kontoerstellung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      },
      
      // Login
      'login': {
        'title': 'Willkommen zurück',
        'subtitle': 'Melden Sie sich an, um fortzufahren',
        'emailLabel': 'E-Mail-Adresse',
        'emailPlaceholder': 'Geben Sie Ihre E-Mail ein',
        'passwordLabel': 'Passwort',
        'passwordPlaceholder': 'Geben Sie Ihr Passwort ein',
        'loginButton': 'Anmelden',
        'loggingIn': 'Anmeldung läuft...',
        'forgotPassword': 'Passwort vergessen?',
        'noAccount': 'Noch kein Konto?',
        'signupLink': 'Registrieren',
        'invalidCredentials': 'Ungültige E-Mail oder Passwort',
        'failed': 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      },
      
      // History
      'history': {
        'title': 'Verlauf',
        'emptyMessage': 'Noch kein Prompt-Verlauf. Erstellen Sie Ihren ersten Prompt, um zu beginnen!',
        'refresh': 'Aktualisieren',
        'loadFailed': 'Verlauf konnte nicht geladen werden',
        'detail': {
          'title': 'Prompt-Details',
          'notFound': 'Prompt nicht gefunden',
          'backToHistory': 'Zurück zum Verlauf',
          'untitled': 'Unbenannter Prompt'
        }
      },
      
      // Settings
      'settings': {
        'title': 'Einstellungen',
        'logout': 'Abmelden',
        'logoutConfirmTitle': 'Abmelden',
        'logoutConfirmMessage': 'Möchten Sie sich wirklich abmelden?',
        'profile': {
          'title': 'Profil',
          'edit': 'Bearbeiten',
          'personalInfo': 'Persönliche Informationen',
          'name': 'Name',
          'email': 'E-Mail',
          'notSet': 'Nicht festgelegt',
          'accountInfo': 'Kontoinformationen',
          'memberSince': 'Mitglied seit',
          'lastLogin': 'Letzte Anmeldung',
          'notAvailable': 'Nicht verfügbar',
          'updateSuccess': 'Profil erfolgreich aktualisiert',
          'updateFailed': 'Profilaktualisierung fehlgeschlagen'
        },
        'preferences': {
          'title': 'Präferenzen',
          'display': 'Anzeige',
          'darkMode': 'Dunkler Modus',
          'autoSave': 'Prompts automatisch speichern',
          'notifications': 'Benachrichtigungen',
          'enableNotifications': 'Benachrichtungen aktivieren',
          'language': 'Sprache',
          'saveSuccess': 'Präferenzen erfolgreich gespeichert'
        },
        'account': {
          'title': 'Konto',
          'changePassword': 'Passwort ändern',
          'privacy': 'Datenschutzeinstellungen'
        },
        'dangerZone': {
          'title': 'Gefahrenzone',
          'deleteAccount': 'Konto löschen'
        }
      },
      
      // Admin
      'admin': {
        'dashboard': {
          'title': 'Admin-Dashboard',
          'overview': 'Systemübersicht',
          'users': 'Benutzer',
          'prompts': 'Prompts',
          'models': 'KI-Modelle',
          'management': 'Verwaltung',
          'manageUsers': 'Benutzer verwalten',
          'manageModels': 'KI-Modelle verwalten',
          'manageTrainingData': 'Trainingsdaten verwalten',
          'viewLogs': 'Systemprotokolle anzeigen',
          'actions': 'Systemaktionen',
          'backup': 'System sichern',
          'maintenance': 'Wartungsmodus',
          'restartServices': 'Dienste neu starten',
          'loadFailed': 'Dashboard-Daten konnten nicht geladen werden',
          'health': {
            'title': 'Systemzustand',
            'good': 'Gut',
            'warning': 'Warnung',
            'critical': 'Kritisch'
          }
        },
        'models': {
          'title': 'KI-Modell-Verwaltung',
          'name': 'Modellname',
          'provider': 'Anbieter',
          'version': 'Version',
          'noVersion': 'Keine Version angegeben',
          'addModel': 'Modell hinzufügen',
          'addNewModel': 'Neues KI-Modell hinzufügen',
          'cancelAdd': 'Abbrechen',
          'activate': 'Aktivieren',
          'deactivate': 'Deaktivieren',
          'namePlaceholder': 'z.B. GPT-4, Claude 2',
          'providerPlaceholder': 'z.B. OpenAI, Anthropic',
          'versionPlaceholder': 'z.B. 4.0, 2.1',
          'nameAndProviderRequired': 'Name und Anbieter sind erforderlich',
          'addSuccess': 'Modell erfolgreich hinzugefügt',
          'addFailed': 'Modell konnte nicht hinzugefügt werden',
          'updateFailed': 'Modell konnte nicht aktualisiert werden',
          'deleteConfirmTitle': 'Modell löschen',
          'deleteConfirmMessage': 'Möchten Sie dieses Modell wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
          'deleteSuccess': 'Modell erfolgreich gelöscht',
          'deleteFailed': 'Modell konnte nicht gelöscht werden',
          'loadFailed': 'Modelle konnten nicht geladen werden',
          'noModels': 'Noch keine KI-Modelle konfiguriert'
        },
        'trainingData': {
          'title': 'Trainingsdaten-Verwaltung',
          'prompt': 'Prompt',
          'response': 'Antwort',
          'category': 'Kategorie',
          'uncategorized': 'Nicht kategorisiert',
          'addData': 'Trainingsdaten hinzufügen',
          'addNewData': 'Neue Trainingsdaten hinzufügen',
          'cancelAdd': 'Abbrechen',
          'promptPlaceholder': 'Geben Sie das Prompt-Beispiel ein',
          'responsePlaceholder': 'Geben Sie die erwartete Antwort ein',
          'categoryPlaceholder': 'Optionale Kategorie',
          'promptAndResponseRequired': 'Prompt und Antwort sind erforderlich',
          'addSuccess': 'Trainingsdaten erfolgreich hinzugefügt',
          'addFailed': 'Trainingsdaten konnten nicht hinzugefügt werden',
          'deleteConfirmTitle': 'Trainingsdaten löschen',
          'deleteConfirmMessage': 'Möchten Sie diese Trainingsdaten wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
          'deleteSuccess': 'Trainingsdaten erfolgreich gelöscht',
          'deleteFailed': 'Trainingsdaten konnten nicht gelöscht werden',
          'loadFailed': 'Trainingsdaten konnten nicht geladen werden',
          'noData': 'Keine Trainingsdaten verfügbar'
        }
      },
      
      // General
      'languages': {
        'en': 'English',
        'ar': 'العربية',
        'de': 'Deutsch'
      },
      'success': 'Erfolg',
      'error': 'Fehler',
      'cancel': 'Abbrechen',
      'delete': 'Löschen',
      'saving': 'Speichern...',
      'save': 'Speichern'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;