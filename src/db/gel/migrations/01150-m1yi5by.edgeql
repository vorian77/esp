CREATE MIGRATION m1yi5bylsy7l2zffdugbc22fnphrbnpio6rkijdjdt6azglu5mou6a
    ONTO m1sbkpi7bx3bk26ie5g5t7j2lnkrk3gjj3sww7yfh4o3tpwl46s3yq
{
  CREATE TYPE sys_core::SysObjAttrVirtual EXTENDING sys_user::Mgmt {
      CREATE MULTI LINK attrsAccess: sys_core::SysObjAttrAccess {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK attrsAction: sys_core::SysObjAttrAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY expr: std::str;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK attrsVirtual: sys_core::SysObjAttrVirtual {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
