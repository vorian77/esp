CREATE MIGRATION m1bsrs5vkyfpeqqvjokdiddpmbb7gftiayudexjz4xca5mnt5cyfuq
    ONTO m1eulu4fckw7665fwgwgbcj7n3br5gzygt2uhjlr532jlvyuotdnga
{
  CREATE TYPE sys_user::SysUserTest EXTENDING sys_user::UserRoot {
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
  };
};
