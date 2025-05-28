CREATE MIGRATION m1xeiemfqfxjs2asfk4kz5p2tzjxgrmzymq3o3p7ijv5x4w2ajmeka
    ONTO m14kuph5cvfbyooryuvf7acocy3fxtaca26info7ra6ydyiddpzu2a
{
  ALTER TYPE sys_core::SysObjAttrAccess {
      ALTER LINK codeAttrAccessType {
          RENAME TO codeObjAttrTypeAccess;
      };
  };
  ALTER TYPE sys_core::SysObjAttrAction {
      ALTER LINK codeAttrActionType {
          RENAME TO codeObjAttrTypeAction;
      };
  };
  ALTER TYPE sys_core::SysSystem {
      DROP LINK typesAttribute;
  };
};
