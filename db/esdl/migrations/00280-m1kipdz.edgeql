CREATE MIGRATION m1kipdzomhxpqbs4waam3vepuucxachm5qo4mxanut5bwcjoc6ha7q
    ONTO m1qfqb6sz76dikcinxqywee2wy5gfgzp4b4qxrboy554yhb25otrrq
{
          ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
  };
  ALTER TYPE sys_user::SysUserTypeTag DROP EXTENDING sys_core::SysObj;
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK tags: sys_user::SysUserTypeTag {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_user::SysUserTypeResource {
      CREATE REQUIRED LINK userTypeResource: sys_core::SysObj;
      CREATE REQUIRED PROPERTY isAccessible: std::bool;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK userTypeResources: sys_user::SysUserTypeResource {
          ON TARGET DELETE ALLOW;
      };
  };
};
