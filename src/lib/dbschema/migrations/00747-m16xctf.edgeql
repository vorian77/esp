CREATE MIGRATION m16xctf3xoeocoe2ol37pnni2ewmvlathkdm476ufkg56cg3sm6bpq
    ONTO m1xwwyvmcjeytbfklnogtf3ui5ykssnmdvel4at5yihl4eiozhbqlq
{
  CREATE TYPE app_cm::CmCohortDoc EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK cohort: app_cm::CmCohort;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY note: std::str;
  };
};
