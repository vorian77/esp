CREATE MIGRATION m1mbwenpal2mmyn2scxdeewwmaj6un3744ywfwsvkub3gkcsum7vqq
    ONTO m1p55wdwbdtd67euvsuvctvf3csdmjuxcfgiedylvd6rqxesmcoogq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isExcludeDisplayAlt {
          RENAME TO isDisplayable;
      };
  };
  ALTER TYPE sys_db::SysColumn {
      DROP PROPERTY isExcludeDisplay;
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY isExcludeDisplayAlt {
          RENAME TO isDisplayable;
      };
  };
};
