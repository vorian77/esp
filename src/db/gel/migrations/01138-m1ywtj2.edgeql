CREATE MIGRATION m1ywtj2i6tqj7ny5dungv2yjt5bo76op3ir2dntl6eu7izfb6he3oq
    ONTO m1uryjn4j74retrrwovi2iclfuii3xasqzn4qolthmbt62dob42ysa
{
  CREATE TYPE sys_user::SysUserType EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK resources: sys_core::SysAttrObj;
      CREATE MULTI LINK tags: sys_core::SysCode;
      CREATE PROPERTY isSelfSignup: std::bool;
  };
  CREATE FUNCTION sys_user::getUserType(userTypeName: std::str) -> OPTIONAL sys_user::SysUserType USING (SELECT
      sys_user::SysUserType
  FILTER
      (.name = userTypeName)
  );
  CREATE FUNCTION sys_user::getUserTypeResource(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysAttrObj USING (SELECT
      std::assert_single((SELECT
          sys_core::SysAttrObj
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK userTypes: sys_user::SysUserType {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK users := (.<userTypes[IS sys_user::SysUser]);
  };
};
