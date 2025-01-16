module app_cm {
  #  Training
  type CmCourse extending sys_core::SysObj {
    codeSector: sys_core::SysCode;
    codeStatus: sys_core::SysCode;
    codeTypePayment: sys_core::SysCodeType;
    multi cohorts: app_cm::CmCohort {
      on target delete allow;
    };
    courseCertifications: str;
    courseExams: str;
    courseItemsIncluded: str;
    courseItemsNotIncluded: str;
    courseRequirements: str;  
    description: str;
    schedule: str;
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
    schedule: str;
    staffInstructor: sys_user::SysUser;
  }

  type CmCohortAttd extending sys_user::Mgmt {
    cohortId := assert_single(.<cohortAttds[is app_cm::CmCohort].id);
    required date: cal::local_date;
    required hours: float32;
    file: json;
    note: str;
  }

  type CmCohortDoc extending sys_user::Mgmt {
    required codeType: sys_core::SysCode;
    required cohort: app_cm::CmCohort;
    required date: cal::local_date;
    file: json;
    note: str;
  }

  # Service Flow
  type CmServiceFlow extending sys_core::SysObj {}


  # Client
  type CmClient extending sys_user::Mgmt {
    agencyId: str;
    codeHighestEducation: sys_core::SysCode;
    hasDriversLicense: bool;
    office: sys_core::SysObjSubject;
    required owner: sys_core::SysSystem;
    required person: default::SysPerson{
      on source delete delete target if orphan;
    };
    school: str;
  }

  type CmClientServiceFlow extending sys_user::Mgmt {
    required client: app_cm::CmClient;
    codeServiceFlowOutcome: sys_core::SysCode;
    codeServiceFlowType: sys_core::SysCode;
    codeStatus: sys_core::SysCode;
    required dateCreated: cal::local_date;
    dateEnd: cal::local_date;
    dateEndEst: cal::local_date;
    dateStart: cal::local_date;
    dateStartEst: cal::local_date;
    idxDemo: int64;
    note: str;
    required serviceFlow: app_cm::CmServiceFlow;
    user: sys_user::SysUser;
  }

  type CmCsfData extending sys_user::Mgmt {
    required csf: app_cm::CmClientServiceFlow;
  }

  type CmCsfCohort extending app_cm::CmCsfData {
    required codeStatus: sys_core::SysCode;
    required cohort: app_cm::CmCohort;
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
    isShareWithClient: bool;
    note: str;
  }

  type CmCsfMsg extending app_cm::CmCsfData {
    required codeStatus: sys_core::SysCode;
    # {
    #   default := (SELECT assert_single(sys_core::SysCode FILTER .codeType.name = 'ct_cm_msg_status' AND .name = 'Sent'));
    # };
    required date: cal::local_date;
    msg: str;
    office: sys_core::SysObjSubject;
    parent: app_cm::CmCsfMsg;
    multi recipients: sys_user::SysUser;
    required sender: sys_user::SysUser;
    subject: str;
  }

  type CmCsfNote extending app_cm::CmCsfData {
    required date: cal::local_date;
    required codeType: sys_core::SysCode;
    note: str;
  }

  type CmCsfJobPlacement extending app_cm::CmCsfData {
    required codeJobType: sys_core::SysCode;
    required codePlacementRelated: sys_core::SysCode;
    codeRetention: sys_core::SysCode;
    required codeWageType: sys_core::SysCode;
    required dateStart: cal::local_date;
    employerContactEmail: str;
    employerContactNameFirst: str;
    employerContactNameLast: str;
    employerContactPhone: str;
    required employerName: str;
    required hoursPerWeek: float32;
    note: str;
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

 type CmPartner extending sys_core::SysObjEnt {}
 
# FUNCTIONS
function getCMTrainingCourse(name: str) -> optional app_cm::CmCourse
  using (select assert_single((select app_cm::CmCourse filter .name = name)));
}




