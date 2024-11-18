CREATE MIGRATION m14r6ymtnkkqqlm46j45svtb4tkazzeevyfzciulj5y2wpryqxehwq
    ONTO m1osjlqryxax7zorcniwiyyjyp6ayvsgj56qg3xr3ruybo5mjvl2rq
{
  ALTER TYPE sys_core::SysDataObjActionQueryTrigger {
      ALTER LINK codeTriggerType {
          RENAME TO codeQueryType;
      };
  };
};
