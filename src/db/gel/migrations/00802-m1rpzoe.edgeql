CREATE MIGRATION m1rpzoerkxjii3pgq53pbvqcz4hlotjqjs4wjljisanrlfic2euota
    ONTO m17bc5nuzyaqnjlz6f2ki6skpqy4asy4t7tlomgvtncxm2rzrxveca
{
          ALTER TYPE sys_core::SysAppHeader {
      ALTER LINK codeIcon {
          RENAME TO codeIcon1;
      };
  };
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeIcon {
          RENAME TO codeIcon1;
      };
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeIcon {
          RENAME TO codeIcon1;
      };
  };
};
