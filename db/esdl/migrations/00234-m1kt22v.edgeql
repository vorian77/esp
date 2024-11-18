CREATE MIGRATION m1kt22vn7c2aoqdaa4kmdyllyk47wvxswifvhztfny3rqpmjcsoqyq
    ONTO m1vqmr54khlr5l4pybew6wohc3ouxcpxtvwgme36hla2yayceaiqaq
{
                  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY actionsQuery;
  };
  CREATE TYPE sys_core::SysDataObjActionQueryParm {
      CREATE REQUIRED PROPERTY key: std::str;
      CREATE REQUIRED PROPERTY value: std::str;
  };
  CREATE TYPE sys_core::SysDataObjActionQueryTrigger {
      CREATE REQUIRED LINK codeTriggerTiming: sys_core::SysCode;
      CREATE REQUIRED LINK codeTriggerType: sys_core::SysCode;
  };
  CREATE TYPE sys_core::SysDataObjActionQuery {
      CREATE MULTI LINK parms: sys_core::SysDataObjActionQueryParm;
      CREATE MULTI LINK triggers: sys_core::SysDataObjActionQueryTrigger;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
