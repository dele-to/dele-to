export interface TranslationKeys {
  // Site metadata
  site: {
    title: string;
    description: string;
    tagline: string;
  };

  // Navigation
  navigation: {
    home: string;
    create: string;
    about: string;
    alternatives: string;
    shareSecurely: string;
  };

  // Common terms
  common: {
    copy: string;
    copied: string;
    copiedToClipboard: string;
    cancel: string;
    confirm: string;
    delete: string;
    edit: string;
    save: string;
    close: string;
    back: string;
    next: string;
    loading: string;
    error: string;
    success: string;
    optional: string;
    required: string;
    shareViaQR: string;
    download: string;
    accessContent: string;
    new: string;
    time: {
      minute_one: string;
      minute_other: string;
      hour_one: string;
      hour_other: string;
      day_one: string;
      day_other: string;
      week_one: string;
      week_other: string;
    };
  };

  // Landing page
  landing: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    features: {
      title: string;
      encryption: {
        title: string;
        description: string;
      };
      ephemeral: {
        title: string;
        description: string;
      };
      zeroKnowledge: {
        title: string;
        description: string;
      };
      openSource: {
        title: string;
        description: string;
      };
    };
    howItWorks: {
      title: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
      step4: {
        title: string;
        description: string;
      };
    };
  };

  // Create page
  create: {
    title: string;
    subtitle: string;
    form: {
      secretLabel: string;
      secretPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      passwordDescription: string;
      expirationLabel: string;
      expirationDescription: string;
      maxViewsLabel: string;
      maxViewsDescription: string;
      submitButton: string;
      creating: string;
      titleLabel: string;
      titleOptional: string;
      contentLabel: string;
      contentRequired: string;
      encryptionNote: string;
      proTip: string;
      proTipContent: string;
      requirePasswordLabel: string;
      generatePassword: string;
      linkTypeLabel: string;
      linkTypeStandard: string;
      linkTypeShorter: string;
      linkTypeStandardLabel: string;
      linkTypeShorterLabel: string;
      linkTypeStandardDesc: string;
      linkTypeShorterDesc: string;
      requirePassword: string;
      requirePasswordDesc: string;
      zeroKnowledgeTitle: string;
      zeroKnowledgeDesc: string;
      createSecureLink: string;
      createSecureLinks: string;
      creatingSecureLinks: string;
      passwordForRecipient: string;
      securityStrategy: string;
      securityStrategyDesc: string;
    };
    expiration: {
      minutes_5: string;
      minutes_15: string;
      minutes_30: string;
      hours_1: string;
      hours_24: string;
      days_7: string;
      never: string;
    };
    maxViews: {
      view1: string;
      views3: string;
      views5: string;
      views10: string;
    };
    multiRecipient: {
      toggle: string;
      addRecipient: string;
      recipientName: string;
      recipientNamePlaceholder: string;
      removeRecipient: string;
      noRecipients: string;
      description: string;
      modeDescription: string;
      recipientsLabel: string;
      recipientPlaceholder: string;
    };
    success: {
      title: string;
      multiTitle: string;
      description: string;
      linkLabel: string;
      secureShareLink: string;
      warning: string;
      multiRecipientTitle: string;
      copyAll: string;
      downloadQR: string;
      securityNotice: string;
      securityNoticeText: string;
      importantNotice: string;
      importantNoticeText: string;
      createAnother: string;
      expires: string;
      maxViews: string;
      passwordProtected: string;
    };
  };

  // View page
  view: {
    title: string;
    passwordRequired: string;
    passwordPlaceholder: string;
    unlockButton: string;
    unlocking: string;
    copySecret: string;
    viewsRemaining: string;
    expiresIn: string;
    expired: string;
    notFound: string;
    views: string;
    view: string;
    burnAfterReading: string;
    viewsRemainingCount: string;
    zeroKnowledgeNotice: string;
    createYourOwn: string;
    loadingDecryption: string;
    accessSecureContent: string;
    shareId: string;
    accessing: string;
    clientSideDecryption: string;
    shareIdNotAvailable: string;
    accessPassword: string;
    accessContent: string;
    decrypting: string;
    enterRequiredPassword: string;
    decryptedContent: string;
    securityNoticeTitle: string;
    securityNoticeContent: string;
    importantNoticeTitle: string;
    importantNoticeContent: string;
    contentDecryptedSuccessfully: string;
    secureContent: string;
    timeRemaining: {
      expired: string;
      hoursMinutes: string;
      minutes: string;
    };
    errors: {
      invalidPassword: string;
      expired: string;
      notFound: string;
      generic: string;
      noEncryptionKey: string;
      noEncryptionKeyDescription: string;
      expectedUrlFormat: string;
      encryptionKeyNotAvailable: string;
      invalidEncryptionKey: string;
      failedToDecrypt: string;
      failedToAccessShare: string;
      unexpectedError: string;
    };
    accessTips: {
      title: string;
      newTip: string;
      verifySender: {
        title: string;
        description: string;
      };
      secureEnvironment: {
        title: string;
        description: string;
      };
      clearAfterUse: {
        title: string;
        description: string;
      };
      actQuickly: {
        title: string;
        description: string;
      };
      dontShare: {
        title: string;
        description: string;
      };
      saveSecurely: {
        title: string;
        description: string;
      };
      watchPhishing: {
        title: string;
        description: string;
      };
      oneTimeAccess: {
        title: string;
        description: string;
      };
    };
  };

  // About page
  about: {
    title: string;
    subtitle: string;
    sections: {
      whatIs: {
        title: string;
        content: string;
      };
      howItWorks: {
        title: string;
        content: string;
      };
      security: {
        title: string;
        content: string;
      };
      privacy: {
        title: string;
        content: string;
      };
      openSource: {
        title: string;
        content: string;
      };
      viewLimits: {
        title: string;
        content: string;
      };
    };
  };

  // Alternatives page
  alternatives: {
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    metaOgTitle: string;
    metaOgDescription: string;
    backToHome: string;
    recommended: string;
    tryNow: string;
    additionalAlternatives: string;
    featureComparison: string;
    featureComparisonDesc: string;
    feature: string;
    soon: string;
    security: string;
    usability: string;
    price: string;
    bestFor: string;
    useCases: {
      businesses: {
        title: string;
        bestChoice: string;
        bestChoiceDesc: string;
        alternative: string;
        alternativeDesc: string;
      };
      developers: {
        title: string;
        bestChoice: string;
        bestChoiceDesc: string;
        alternative: string;
        alternativeDesc: string;
      };
      personal: {
        title: string;
        bestChoice: string;
        bestChoiceDesc: string;
        alternative: string;
        alternativeDesc: string;
      };
    };
    securityComparison: {
      title: string;
      subtitle: string;
      zeroKnowledge: string;
      serverSide: string;
      descriptions: {
        deletoEncryption: string;
        yopassEncryption: string;
        privatebinEncryption: string;
        passwordpusherEncryption: string;
        onetimesecretEncryption: string;
      };
    };
    whyChoose: {
      title: string;
      maxSecurity: string;
      maxSecurityDesc: string;
      modernExperience: string;
      modernExperienceDesc: string;
      extraProtection: string;
      extraProtectionDesc: string;
    };
    tryButton: string;
    tools: {
      deleto: {
        name: string;
        description: string;
        features: string[];
        pricing: string;
        security: string;
        usability: string;
        pros: string[];
        cons: string[];
        bestFor: string;
      };
      yopass: {
        name: string;
        description: string;
        features: string[];
        pricing: string;
        security: string;
        usability: string;
        pros: string[];
        cons: string[];
        bestFor: string;
      };
      passwordpusher: {
        name: string;
        description: string;
        features: string[];
        pricing: string;
        security: string;
        usability: string;
        pros: string[];
        cons: string[];
        bestFor: string;
      };
      privatebin: {
        name: string;
        description: string;
        features: string[];
        pricing: string;
        security: string;
        usability: string;
        pros: string[];
        cons: string[];
        bestFor: string;
      };
      onetimesecret: {
        name: string;
        description: string;
        features: string[];
        pricing: string;
        security: string;
        usability: string;
        pros: string[];
        cons: string[];
        bestFor: string;
      };
    };
    features: {
      multiRecipient: string;
      zeroKnowledge: string;
      clientSideEncryption: string;
      passwordProtection: string;
      fileSharing: string;
      apiAccess: string;
      selfHosted: string;
      openSource: string;
      mobileOptimized: string;
      syntaxHighlighting: string;
    };
    ratings: {
      excellent: string;
      good: string;
      fair: string;
      free: string;
      freePaid: string;
    };
  };

  // VS comparison pages
  vs: {
    yopass: {
      metaTitle: string;
      metaDescription: string;
      metaOgTitle: string;
      metaOgDescription: string;
      title: string;
      subtitle: string;
    };
    passwordpusher: {
      metaTitle: string;
      metaDescription: string;
      metaOgTitle: string;
      metaOgDescription: string;
      title: string;
      subtitle: string;
    };
    privatebin: {
      metaTitle: string;
      metaDescription: string;
      metaOgTitle: string;
      metaOgDescription: string;
      title: string;
      subtitle: string;
    };
    onetimesecret: {
      metaTitle: string;
      metaDescription: string;
      metaOgTitle: string;
      metaOgDescription: string;
      title: string;
      subtitle: string;
      securityAlert: string;
    };
    common: {
      backToAlternatives: string;
      features: string;
      comparison: string;
      whyChooseDeleto: string;
      tryDeleto: string;
      clientSideEncryption: string;
      zeroKnowledgeArchitecture: string;
      customExpirationTimes: string;
      viewCountLimits: string;
      passwordProtection: string;
      modernUiUx: string;
      multiRecipientSharing: string;
      mobileOptimized: string;
      fileSharing: string;
      apiAccess: string;
      selfHosted: string;
      openSource: string;
      chooseDeletoIf: string;
      chooseAlternativeIf: string;
      useCases: {
        modernInterface: string;
        passwordProtectionNeeded: string;
        textCredentials: string;
        mobileFirst: string;
        securityGuidance: string;
        fileSharing: string;
        battleTested: string;
        minimalistInterface: string;
        selfHostingNow: string;
        largeFiles: string;
        noPasswordProtection: string;
        existingWorkflows: string;
      };
      recommendation: {
        title: string;
        intro: string;
        forModernTeams: string;
        forModernTeamsDesc: string;
        forFileSharing: string;
        forFileSharingDesc: string;
        tryNow: string;
      };
      securityAnalysis: {
        title: string;
        subtitle: string;
        deletoSecurity: string;
        yopassSecurity: string;
        deletoFeatures: {
          aes256Gcm: string;
          urlFragments: string;
          passwordProtection: string;
          securityTips: string;
          redisTtl: string;
        };
        yopassFeatures: {
          aes256: string;
          zeroKnowledge: string;
          provenTrack: string;
          fileEncryption: string;
          multipleBackends: string;
        };
      };
      securityComparison: {
        title: string;
        subtitle: string;
        deletoZeroKnowledge: string;
        onetimesecretServerSide: string;
        step1: string;
        step2: string;
        step3: string;
        deletoStep1: string;
        deletoStep1Desc: string;
        deletoStep2: string;
        deletoStep2Desc: string;
        deletoStep3: string;
        deletoStep3Desc: string;
        onetimesecretStep1: string;
        onetimesecretStep1Desc: string;
        onetimesecretStep2: string;
        onetimesecretStep2Desc: string;
        onetimesecretStep3: string;
        onetimesecretStep3Desc: string;
      };
      comparisonDetails: {
        clientSideEncryption: string;
        zeroKnowledgeArchitecture: string;
        customExpirationTimes: string;
        viewCountLimits: string;
        passwordProtection: string;
        modernUiUx: string;
        mobileOptimized: string;
        fileSharing: string;
        apiAccess: string;
        selfHosted: string;
        openSource: string;
        multiRecipientSharing: string;
      };
      useCasesDeletо: {
        maxPrivacy: string;
        clientSideEncryption: string;
        modernUi: string;
        textSecrets: string;
        securityGuidance: string;
      };
      useCasesAlternative: {
        apiAccess: string;
        customDomains: string;
        serverSideEncryption: string;
        complianceFeatures: string;
        enterpriseIntegrations: string;
      };
      finalRecommendation: {
        title: string;
        intro: string;
        maxSecurityTitle: string;
        maxSecurityDesc: string;
        enterpriseFeaturesTitle: string;
        enterpriseFeaturesDesc: string;
      };
      statusLabels: {
        partial: string;
        soon: string;
      };
    };
  };

  // Security tips
  security: {
    title: string;
    tips: {
      usePassword: string;
      shortExpiration: string;
      limitViews: string;
      shareSecurely: string;
      verifyRecipient: string;
    };
    bestPractices: {
      title: string;
      useHttps: {
        title: string;
        description: string;
      };
      shortExpiration: {
        title: string;
        description: string;
      };
      singleUse: {
        title: string;
        description: string;
      };
      shareComplete: {
        title: string;
        description: string;
      };
    };
    flowDiagram: {
      title: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
      step4: {
        title: string;
        description: string;
      };
      step5: {
        title: string;
        description: string;
      },
    },
    technicalDetails: {
      title: string;
      aesGcm: {
        title: string;
        description: string;
      };
      webCrypto: {
        title: string;
        description: string;
      };
      zeroAccess: {
        title: string;
        description: string;
      };
      autoTtl: {
        title: string;
        description: string;
      };
    };
  };

  // Footer
  footer: {
    tagline: string;
    madeWith: string;
    by: string;
    links: {
      github: string;
      twitter: string;
      privacy: string;
      terms: string;
    };
  };

  // PWA Install Prompt
  pwa: {
    title: string;
    description: string;
    installButton: string;
    laterButton: string;
    iosInstructions: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
    };
  };

  // Errors
  errors: {
    somethingWrong: string;
    tryAgain: string;
    contactSupport: string;
  };
}

export type TranslationNamespace = 'translation';
