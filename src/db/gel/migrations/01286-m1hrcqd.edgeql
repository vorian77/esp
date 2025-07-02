CREATE MIGRATION m1hrcqdlxabd7ffgm24fnyher62jnvwmxgmqvilugaba4iv3hv7f5q
    ONTO m1qgjchs6nrifazuyeak2swzctrouiaxapo2yppy7gryaeznpictrq
{
  ALTER TYPE sys_core::SysObjOrg {
      DROP LINK owner;
  };
};
