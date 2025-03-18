CREATE MIGRATION m1772gj2cebtujmmtjtfdwmghx7go27kcri7mr75xqs5z5mr3vj3ba
    ONTO m16ckczamchm77hbegcbkla2mkaagmerohyswxh6pe6uxl4jeb4x7q
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeOp {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE LINK codeValueTriggerType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE MULTI LINK valueTriggerAttributes: sys_core::SysObjEntAttr;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE MULTI LINK valueTriggerCodes: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER PROPERTY valueTrigger {
          RENAME TO valueTriggerScalar;
      };
  };
};
