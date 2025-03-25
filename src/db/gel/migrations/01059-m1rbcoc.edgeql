CREATE MIGRATION m1rbcoctor2do2yoh47n5eu2oc37ys6u5lcx4ydut25w3l66ejcofa
    ONTO m14reqgdspu6n3zm6swn7geqzlpnjfq2abyxdgeovkzv7m7jjrpg7a
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrType {
          RENAME TO codeAttrTypes;
      };
  };
  ALTER TYPE sys_core::SysAttrSource {
      ALTER LINK codeAttrType {
          RENAME TO codeAttrTypes;
      };
  };
};
