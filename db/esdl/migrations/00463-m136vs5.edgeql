CREATE MIGRATION m136vs5zpzsjkcvyxqjilkt23hqvx2lm7y4tx3ifywr4upbj67xsga
    ONTO m1qdvuz6aexhktmmqv5rfkdo3n5obpmi4joq6s2hlgabgozx4g24za
{
  CREATE TYPE sys_core::SysDataObjListEditDataMapItem EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY expr: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK listEditDataMapItems: sys_core::SysDataObjListEditDataMapItem {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
