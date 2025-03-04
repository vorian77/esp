CREATE MIGRATION m12xuyb4qjqc6cdor4a4jv2rnhhryhuse3nrqqglb4yagk7k5ev7yq
    ONTO m1yszjar4c4jkvtf5xvst6kvqirs6mq2ca2r2juyumlna4rdrsjs4a
{
                  CREATE TYPE sys_rep::SysRepParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE MULTI LINK parms: sys_rep::SysRepParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE LINK table: sys_db::SysTable;
  };
  ALTER TYPE sys_rep::SysRep {
      DROP LINK tables;
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE PROPERTY exprFilter: std::str;
  };
  CREATE TYPE sys_rep::SysRepUserParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK parm: sys_rep::SysRepParm;
      CREATE PROPERTY value: std::json;
  };
  CREATE TYPE sys_rep::SysRepUserEl EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK element: sys_rep::SysRepEl;
      CREATE REQUIRED PROPERTY isShow: std::bool;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_rep::SysRepUser {
      CREATE MULTI LINK elements: sys_rep::SysRepUserEl {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_rep::SysRepUserAnalytic EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK analytic: sys_rep::SysAnalytic;
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
