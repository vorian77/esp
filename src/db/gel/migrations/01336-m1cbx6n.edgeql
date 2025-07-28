CREATE MIGRATION m1cbx6nezzmcoeersnd2cxjdt6op2rb7625ghbiki5a7xl3cibggta
    ONTO m1fds4lfvpifjsahsc5hnliisfrxex45y5xm4yhodn6n5fxqgmbzsq
{
  ALTER TYPE sys_core::SysMsg {
      DROP LINK thread;
      DROP LINK replies;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP LINK users;
  };
  ALTER TYPE sys_core::SysSystem {
      DROP LINK users;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK users;
  };
};
