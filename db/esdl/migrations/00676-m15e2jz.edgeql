CREATE MIGRATION m15e2jzszgusgyj45x2lpxcb6m26nzmlcagmkuomqhralxunzufzdq
    ONTO m1yffd2p3n3nedf4cxstizqtzlkuoe76c67pkzobbi4dlfp7ulq6sa
{
  CREATE TYPE sys_user::SysUserTypeResource {
      CREATE REQUIRED LINK codeTypeResource: sys_core::SysCode;
      CREATE LINK codeTypeSubject: sys_core::SysCode;
      CREATE REQUIRED LINK resource: sys_core::SysObj;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK resources: sys_user::SysUserTypeResource {
          ON TARGET DELETE ALLOW;
      };
  };
};
