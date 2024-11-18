CREATE MIGRATION m14hsg5ygans7lhlmqbknqz2kkkda5m43kyajxhu4sl7hci6f4ceja
    ONTO m1stgspvsukz3kooltbhw4njmuxewt6drlzdvokq6nlo2jesxjsfia
{
      ALTER TYPE sys_user::SysUserTypeResource {
      CREATE LINK codeUserTypeResource: sys_core::SysCodeType;
  };
};
