CREATE MIGRATION m1rt7q2yj37c65y36uqqhcik7rgfzbm7e6d7tkftbaekzznpqjvsqq
    ONTO m1hnpfqohkbgajg4sxiueh5usf474h457daldammlnxdks3dxtzuba
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY dbOrderSelect {
          RENAME TO orderSelect;
      };
  };
};
