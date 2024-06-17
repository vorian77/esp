CREATE MIGRATION m1eulu4fckw7665fwgwgbcj7n3br5gzygt2uhjlr532jlvyuotdnga
    ONTO m1ri6rokjk2adxe6euyoldrfyzmf6hupkflka2yhinbsdqcjdzglaq
{
  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK codeUserTypeResource {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
