CREATE MIGRATION m1bafc76jcxpeoitlc4qt57dhdagipnpnkuzsuaaxwi3ehz3ter6aa
    ONTO m1hf3ph5xnhvru3rg5gewuihcrzwrnxiiks7doyviass2lynzf6zuq
{
      CREATE TYPE sys_rep::SysAnalyticStatus EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE PROPERTY comment: std::str;
      CREATE PROPERTY expr: std::str;
  };
  CREATE TYPE sys_rep::SysRepParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeParmType: sys_core::SysCode;
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
      CREATE LINK linkTable: sys_db::SysTable;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY fieldListItemsParmName: std::str;
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysAnalytic EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK parms: sys_rep::SysRepParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK statuses: sys_rep::SysAnalyticStatus {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY description: std::str;
  };
  CREATE FUNCTION sys_rep::getAnalytic(name: std::str) -> OPTIONAL sys_rep::SysAnalytic USING (SELECT
      sys_rep::SysAnalytic
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_rep::SysRepEl EXTENDING sys_user::Mgmt {
      CREATE LINK codeDataType: sys_core::SysCode;
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE LINK column: sys_db::SysColumn;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY expr: std::str;
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY isDisplay: std::bool;
      CREATE REQUIRED PROPERTY isDisplayable: std::bool;
      CREATE PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysRep EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK analytics: sys_rep::SysAnalytic;
      CREATE MULTI LINK elements: sys_rep::SysRepEl {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK parms: sys_rep::SysRepParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK table: sys_db::SysTable;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY exprFilter: std::str;
  };
  CREATE FUNCTION sys_rep::getReport(name: std::str) -> OPTIONAL sys_rep::SysRep USING (SELECT
      sys_rep::SysRep
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_rep::SysRepUserParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK parm: sys_rep::SysRepParm;
      CREATE PROPERTY parmValue: std::json;
  };
  CREATE TYPE sys_rep::SysRepUserAnalytic EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK analytic: sys_rep::SysAnalytic;
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_rep::SysRepUserEl EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK element: sys_rep::SysRepEl;
      CREATE REQUIRED PROPERTY isDisplay: std::bool;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE TYPE sys_rep::SysRepUser EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK report: sys_rep::SysRep;
      CREATE MULTI LINK elements: sys_rep::SysRepUserEl {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK parms: sys_rep::SysRepUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE PROPERTY descriptionUser: std::str;
      CREATE PROPERTY headerUser: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
};
