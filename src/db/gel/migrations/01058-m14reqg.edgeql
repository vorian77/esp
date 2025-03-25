CREATE MIGRATION m14reqgdspu6n3zm6swn7geqzlpnjfq2abyxdgeovkzv7m7jjrpg7a
    ONTO m1o4tfm3ndrxj3zj6324mn6mbk2rvqnrkf365yklbg7hjafns3tgyq
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrsAccessSource {
          RENAME TO codeAttrAccessSource;
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrsAccessType {
          RENAME TO codeAttrAccessType;
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrsType {
          RENAME TO codeAttrType;
      };
  };
  ALTER TYPE sys_core::SysAttrSource {
      ALTER LINK codeAttrsAccessSource {
          RENAME TO codeAttrAccessSource;
      };
  };
  ALTER TYPE sys_core::SysAttrSource {
      ALTER LINK codeAttrsType {
          RENAME TO codeAttrType;
      };
  };
};
