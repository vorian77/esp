CREATE MIGRATION m1wkobzazw53cbdqvbswylrimxcnh7dymi52bfao2nmy45jnepszuq
    ONTO m1djb7gs2vxhrcvicp5tiw5amz56oehugkbzacl6g5mn6f6ikcgxxq
{
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      ALTER LINK codeOp {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      CREATE REQUIRED LINK codeValueTypeTarget: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      CREATE REQUIRED LINK codeValueTypeTrigger: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      DROP PROPERTY isTargetValueReset;
  };
};
