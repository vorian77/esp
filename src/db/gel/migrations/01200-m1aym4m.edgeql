CREATE MIGRATION m1aym4meunkamwcfgnjhdb3edhyqxheyftq4wtg2g2xxovhfdupglq
    ONTO m13yy2mczjw3665obiz3h6n7gk2icpe6psxkckq5f5pjquqdzthyja
{
  ALTER TYPE sys_core::SysMsg {
      CREATE MULTI LINK readers: sys_user::SysUser;
      ALTER LINK sender {
          SET TYPE sys_user::SysUser USING (.sender[IS sys_user::SysUser]);
      };
  };
};
