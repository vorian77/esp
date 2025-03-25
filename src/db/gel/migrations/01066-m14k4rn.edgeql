CREATE MIGRATION m14k4rnmkb777va2iddpilivgfaf37k5sriy5pbtul2s7gozpv6lkq
    ONTO m1kj7sj5k2kite7hmrli7ybais5nk7iosnihi57hkvop75f4y5cyka
{
  ALTER TYPE sys_core::SysObj {
      ALTER PROPERTY isGlobalResource {
          RENAME TO isGlobalResourceOld;
      };
  };
};
