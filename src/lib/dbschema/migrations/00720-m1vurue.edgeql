CREATE MIGRATION m1vurueqo3wkornj7nornm75ttowuylgvct6psw2cncr42hyw2udna
    ONTO m1rdbk6t7mwzrjmsi4z34dzn3ny65s2oxziupaso7ly23cdydye4fa
{
  CREATE TYPE sys_user::SysUserTypeResource {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK resource: sys_core::SysObj;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK resources: sys_user::SysUserTypeResource {
          ON TARGET DELETE ALLOW;
      };
  };
};
