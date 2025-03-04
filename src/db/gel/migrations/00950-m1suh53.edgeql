CREATE MIGRATION m1suh53e2bdnapxrzdn77x2mdd5il22hu3ugq42aee55u4kz5ioqoq
    ONTO m16iab7rm56op22g4nys6lcjhechvjv6jmpv6v6m5d2nfxazimmfoa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeAttributeType {
          RENAME TO codeAttrType;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY attributeAccess {
          RENAME TO attrAccess;
      };
  };
};
