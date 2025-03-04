CREATE MIGRATION m1z7ajoyiy3mdo3nybmpzxdupfdr64qwrla6xbu3hcn4dteslhcjyq
    ONTO m1aznr6nlfgv2pp2f5z2kd5cwmagk5aakc2vjpljao5bp7wwemengq
{
                  DROP ALIAS sys_user::SysUserTypeResourceObjects;
  CREATE TYPE sys_user::t0 EXTENDING sys_core::SysObj;
  CREATE TYPE sys_user::t1 EXTENDING sys_core::SysObj;
};
