CREATE MIGRATION m1cyzvuuivle3h5u25nekrn7t4yfpqzvrc7tn6gr4tuvlmn5mtt7eq
    ONTO m1seh5kb67b4toqjqhjgl36s3rlz3y7jfl4n53fbobychsu35hkava
{
  CREATE TYPE sys_user::SysUserActionPost EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK action: sys_user::SysUserAction;
      CREATE LINK codeDestination: sys_core::SysCode;
      CREATE LINK codeMsgDelivery: sys_core::SysCode;
      CREATE PROPERTY msg: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK actionPost: sys_user::SysUserActionPost {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK actionPost: sys_user::SysUserActionPost {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY file: std::json;
  };
  CREATE TYPE sys_core::SysNotify EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeNotifyType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY exprCron: std::str;
      CREATE PROPERTY exprData: std::str;
      CREATE REQUIRED PROPERTY exprTrigger: std::str;
      CREATE PROPERTY msg: std::str;
  };
};
