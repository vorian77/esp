CREATE MIGRATION m1yj7j22y754ugx44pflfzpariamzhs5xyb6ltzunoakptpifzm7vq
    ONTO m1mkgommxspjvdkmjwga52jnscy5rrmtbax342dq4u6cbus7rdbprq
{
  CREATE TYPE sys_core::SysObjAttrExpr EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrTypeAction: sys_core::SysCode;
      CREATE REQUIRED PROPERTY exprAllow: std::str;
      CREATE REQUIRED PROPERTY exprObjs: std::str;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK attrsExpr: sys_core::SysObjAttrExpr {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
