CREATE MIGRATION m1qljdwlv3arpkjv4mttnscogqdpyxx43nwigan342vghxupafn2vq
    ONTO m1hofizw6gjfliulljzscqynbb3bie665ooqtjgponrtqpaynmhk6a
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrsAccess {
          RENAME TO codeAttrsAccessType;
      };
  };
};
