CREATE MIGRATION m16zsjykumnn7fxduzgbtrpyhbt3fh2vg5qibduxnasltjtnkva3oa
    ONTO m1jvikw55cwakmlvgmguvx2q4p7f5fe7sbpmi6be4ksqvmhmdzh4va
{
  ALTER TYPE app_cm::CmClient {
      DROP LINK office;
  };
  CREATE TYPE sys_core::SysAttr EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK obj: sys_core::SysObjEnt {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY hasAccess: std::bool;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attributes: sys_core::SysAttr {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE app_cm::CmCsfMsg {
      DROP LINK office;
  };
};
