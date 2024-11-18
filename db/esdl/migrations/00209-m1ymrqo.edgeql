CREATE MIGRATION m1ymrqoe53t2sayocz7ndnjtw4464ohkexncl3smo43ffvokvjvlfa
    ONTO m1bcrpjodag7ha4s6ghhkzaqghuism5wdz2kgjzz24irpbnyh4ugkq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumnsDisplay: sys_db::SysColumn;
      CREATE LINK linkTable: sys_db::SysTable;
      CREATE PROPERTY linkExprSave: std::str;
  };
};
