CREATE MIGRATION m1ri6rokjk2adxe6euyoldrfyzmf6hupkflka2yhinbsdqcjdzglaq
    ONTO m14hsg5ygans7lhlmqbknqz2kkkda5m43kyajxhu4sl7hci6f4ceja
{
                  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK codeUserTypeResource {
          SET TYPE sys_core::SysCode USING (.codeUserTypeResource[IS sys_core::SysCode]);
      };
  };
};
