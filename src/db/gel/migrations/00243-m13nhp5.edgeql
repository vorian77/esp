CREATE MIGRATION m13nhp5ewg33epf343zghvojzdqv2b5xccuqjllzry5vtts64w5ykq
    ONTO m13mtwy2dol2hn6htkoih3dbxa7pjprthxvnhx45ijpkssxenvsi5a
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK items {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
