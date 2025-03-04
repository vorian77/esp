CREATE MIGRATION m1osjlqryxax7zorcniwiyyjyp6ayvsgj56qg3xr3ruybo5mjvl2rq
    ONTO m1ps6y73lkj5gu4pqoc2amwtj7vumo2rekd4zrc62qfe5tr52tbv7a
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY exprPresetScalar {
          RENAME TO exprPreset;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY linkExprPreset;
  };
};
