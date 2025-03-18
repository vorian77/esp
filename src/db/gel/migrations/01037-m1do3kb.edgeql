CREATE MIGRATION m1do3kbi5pevy2eay5jcny7gqaevrhiymdkcmlu32i2hdw74nbtu5q
    ONTO m1772gj2cebtujmmtjtfdwmghx7go27kcri7mr75xqs5z5mr3vj3ba
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeLinkValueType {
          RENAME TO codeValueType;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeValueTriggerType {
          RENAME TO valueTargetCode;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeValueTypeTarget {
          RENAME TO codeValueAction;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE LINK valueTargetAttribute: sys_core::SysObjEntAttr;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER PROPERTY valueTarget {
          RENAME TO valueTargetScalar;
      };
  };
};
