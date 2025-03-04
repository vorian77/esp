CREATE MIGRATION m1ct627bfbuv4de5zidvuv64rvwdcnxbjq7r7tlqcwxocacgnn3xbq
    ONTO m1so27mx7xvpap5bzl2s7zuatwx43hskkvwmy5lvg2cudvnah3abeq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK props;
  };
};
