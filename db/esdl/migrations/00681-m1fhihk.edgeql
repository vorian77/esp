CREATE MIGRATION m1fhihksmggil3r54xq5hr46onxfxavonktngr3ogbio64lnod5i3a
    ONTO m1alzfdtpixkzh7hlzbi4blpy5zzycbdpdzl7b7hckez3efgm46hoq
{
  ALTER TYPE sys_core::SysObjSubject {
      DROP PROPERTY appName;
      DROP PROPERTY logoFileName;
  };
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY appName: std::str;
      CREATE PROPERTY logoFileName: std::str;
  };
};
