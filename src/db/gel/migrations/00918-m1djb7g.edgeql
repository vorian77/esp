CREATE MIGRATION m1djb7gs2vxhrcvicp5tiw5amz56oehugkbzacl6g5mn6f6ikcgxxq
    ONTO m1xf3hdpl3oouc2msgl4bofi3wvhcjvwuiecviz3bk2lqwemngfxia
{
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      ALTER PROPERTY orderDefine {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
