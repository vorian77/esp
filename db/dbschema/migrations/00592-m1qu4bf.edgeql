CREATE MIGRATION m1qu4bfrgxo4p3lalvxzcpj7e3mxjirqpq7wlakkgzj4ltj77sxb6q
    ONTO m1yvmmihhbmvplvmsjbtqktqpm5hk6wl4yxi2244ww5wii5r3uazxa
{
  ALTER TYPE sys_user::Mgmt {
      CREATE LINK createdBy: sys_user::SysUser {
          SET readonly := true;
      };
      CREATE LINK modifiedBy: sys_user::SysUser;
  };
};
