CREATE MIGRATION m1i4ajlnvw56avujd4vut5t4qf37ciwb4rywcs7la4yz4ilayx23ia
    ONTO m1lmwig4jw27jp3hkfzat3wswcbvlpabtvdp3xt37b3blfzs5bpkeq
{
  CREATE MODULE app_cm_analytic IF NOT EXISTS;
  CREATE TYPE app_cm_analytic::CmAnalyticDoc {
      CREATE LINK codeDocType: sys_core::SysCode;
      CREATE PROPERTY cmAnalyticDaysAlarm: std::int16;
      CREATE PROPERTY cmAnalyticDaysPending: std::int16;
      CREATE PROPERTY userId: std::uuid;
  };
  CREATE TYPE app_cm_analytic::CmAnalyticDocColumn {
      CREATE PROPERTY expr: std::str;
      CREATE PROPERTY header: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY order: std::int16;
  };
};
