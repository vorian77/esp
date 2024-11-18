CREATE MIGRATION m1alzfdtpixkzh7hlzbi4blpy5zzycbdpdzl7b7hckez3efgm46hoq
    ONTO m15o6rquzlwwgtgcovxm2nul3756hxb6x5g2ocendjss7irucfwpvq
{
  ALTER TYPE sys_core::SysObjSubject {
      CREATE PROPERTY appName: std::str;
      CREATE PROPERTY logoFileName: std::str;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources_sys_widget;
  };
};
