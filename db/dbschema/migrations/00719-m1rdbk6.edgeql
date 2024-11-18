CREATE MIGRATION m1rdbk6t7mwzrjmsi4z34dzn3ny65s2oxziupaso7ly23cdydye4fa
    ONTO m1kaqzhfkymihtj2zuubjfuehqxwpe57iwwhmwgghcvi25humeslgq
{
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
  };
  DROP TYPE sys_user::SysUserTypeResource;
};
