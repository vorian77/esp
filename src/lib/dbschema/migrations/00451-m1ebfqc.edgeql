CREATE MIGRATION m1ebfqcaz6v7nmojeqxjpcjkeg4hxi6ptc25vdjdufcljaf6vwxkda
    ONTO m1dlghb7qp4jptu6ydwxsrnvn443mdy2vspxf32pfwkxapp7hv7rka
{
  CREATE TYPE sys_core::SysDataObjListEditDataMapItem EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK listEditDataMapItem: sys_core::SysDataObjListEditDataMapItem {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
