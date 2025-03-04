CREATE MIGRATION m1redf3jmhjulfpeiixt3x43s3wdvj6ldqeg26mhufcoet5svr7vxa
    ONTO m1qw522j7qmdv3k6fte72rqujwdj5bnht6ddnvclwvhvngpogeabhq
{
  CREATE TYPE sys_core::SysDataObjColumnTriggerTarget EXTENDING sys_user::Mgmt {
      CREATE LINK codeAccess: sys_core::SysCode;
      CREATE REQUIRED LINK codeOp: sys_core::SysCode;
      CREATE LINK codeValueTarget: sys_core::SysCode;
      CREATE LINK codeValueTrigger: sys_core::SysCode;
      CREATE REQUIRED LINK column: sys_core::SysDataObjColumn {
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY fieldListItemsParmName: std::str;
      CREATE PROPERTY isTargetValueReset: std::bool;
      CREATE PROPERTY valueScalarTarget: std::str;
      CREATE PROPERTY valueScalarTrigger: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK itemChangeTargets: sys_core::SysDataObjColumnTriggerTarget {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
