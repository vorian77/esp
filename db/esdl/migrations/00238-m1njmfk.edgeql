CREATE MIGRATION m1njmfkh2rzotp7bxigfbelp4uvrwegu3ny7hheykma3ghjfq5ippa
    ONTO m1pdn7wv2lm3tegkltzaid63xdu4rate4mn4b33gjl7ytum3mqcfqq
{
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
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK actionsQuery: sys_core::SysDataObjActionQuery {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
