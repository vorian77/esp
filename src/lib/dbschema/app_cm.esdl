module app_cm {
  #  Training
  type CmCourse extending sys_core::SysObj {
    multi codeMultiCerts: sys_core::SysCode;
    multi codeMultiExams: sys_core::SysCode;
    multi codeMultiItemsIncluded: sys_core::SysCode;
    multi codeMultiItemsNotIncluded: sys_core::SysCode;
    multi codeMultiRqmts: sys_core::SysCode;
    codeSector: sys_core::SysCode;
    codeStatus: sys_core::SysCode;
    codeTypePayment: sys_core::SysCodeType;
    multi cohorts: app_cm::CmCohort {
      on target delete allow;
    };
    description: str;
    provider: sys_core::SysOrg;
    schedule: str;
    staffAdmin: sys_user::SysStaff;
    staffAgency: sys_user::SysStaff;
  }

  type CmCohort extending sys_core::SysObj {
    capacity: int16;
    codeStatus: sys_core::SysCode;
    multi cohortAttds: app_cm::CmCohortAttd {
      on target delete allow;
    };
    cost: float32;
    course := assert_single(.<cohorts[is app_cm::CmCourse]);
    dateEnd: cal::local_date;
    dateStart: cal::local_date;
    isCohortRequired: str;
    note: str;
    schedule: str;
    staffAdmin: sys_user::SysStaff;
    staffAgency: sys_user::SysStaff;
    staffInstructor: sys_user::SysStaff;
    venue: sys_core::SysOrg;
  }

  type CmCohortAttd extending sys_user::Mgmt {
    cohortId := assert_single(.<cohortAttds[is app_cm::CmCohort].id);
    required date: cal::local_date;
    required hours: float32;
    file: json;
    note: str;
  }

  # Service Flow
  type CmServiceFlow extending sys_core::SysObj {}


  # Client
  type CmClient extending sys_user::Mgmt {
    required owner: sys_core::SysOrg;
    required person: default::SysPerson{
      on source delete delete target if orphan;
    };
    agencyId: str;
    school: str;
  }

  type CmClientServiceFlow extending sys_user::Mgmt {
    required client: app_cm::CmClient;
    required serviceFlow: app_cm::CmServiceFlow;
    codeReferralType: sys_core::SysCode;
    codeReferralEndType: sys_core::SysCode;
    required dateReferral: cal::local_date;
    dateStartEst: cal::local_date;
    dateStart: cal::local_date;
    dateEndEst: cal::local_date;
    dateEnd: cal::local_date;
    note: str;
  }

  type CmCsfData extending sys_user::Mgmt {
    required csf: app_cm::CmClientServiceFlow;
  }

  type CmCsfCohort extending app_cm::CmCsfData {
    required codeStatus: sys_core::SysCode;
    required cohort: app_cm::CmCohort;
    dateEnd: cal::local_date;
    dateEndEst: cal::local_date;
    dateReferral: cal::local_date;
    dateStart: cal::local_date;
    dateStartEst: cal::local_date;  
    note: str;
  }

  type CmCsfCohortAttd extending sys_user::Mgmt {
    required cohortAttd: app_cm::CmCohortAttd;
    required codeCmCohortAttdDuration: sys_core::SysCode;
    computedHours := (select .codeCmCohortAttdDuration.valueDecimal * .cohortAttd.hours);
    required csfCohort: app_cm::CmCsfCohort;
    note: str;
  }  

  type CmCsfDocument extending app_cm::CmCsfData {
    required codeType: sys_core::SysCode;
    dateExpires: cal::local_date;
    required dateIssued: cal::local_date;
    file: json;
    isShareWithClient: str;
    note: str;
    required staffAgency: sys_user::SysStaff;
  }

  type CmCsfNote extending app_cm::CmCsfData {
    required date: cal::local_date;
    required codeType: sys_core::SysCode;
    note: str;
  }

  type CmCsfJobPlacement extending app_cm::CmCsfData {
    required codeJobType: sys_core::SysCode;
    required codePlacementRelated: sys_core::SysCode;
    required codeWageType: sys_core::SysCode;
    required dateStart: cal::local_date;
    required dateSubmitted: cal::local_date;
    employerContactEmail: str;
    employerContactNameFirst: str;
    employerContactNameLast: str;
    required employerName: str;
    required hoursPerWeek: float32;
    note: str;
    required staffAgency: sys_user::SysStaff;
    required title: str;
    wage: float32;
  }

   type CmCsfSchoolPlacement extending app_cm::CmCsfData {
    required date: cal::local_date;
    required codeCollegeStatus: sys_core::SysCode;
    collegeGPA: str;
    collegeGradYear: int16;
    collegeMajor: str;
    collegeName: str;
    note: str;
  }

  type CmPartner extending sys_core::SysOrg {}

  # FUNCTIONS
  function getCMTrainingCourse(name: str) -> optional app_cm::CmCourse
      using (select assert_single((select app_cm::CmCourse filter .name = name)));
}




