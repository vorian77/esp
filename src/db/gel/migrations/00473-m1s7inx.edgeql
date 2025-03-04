CREATE MIGRATION m1s7inxgngej646itg6av4r5f55y5ee4bp7qv4dcrbbfmwyxtmxvaa
    ONTO m1o46zout6ejdorrnfnkanonmkrlor2x3q2cskd5ycisumi5klwdkq
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeAlignment {
          RENAME TO codeAlignmentAlt;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY fieldName;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isExcludeDisplay {
          RENAME TO isExcludeDisplayAlt;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isExcludeDisplayAlt {
          RESET OPTIONALITY;
      };
  };
};
