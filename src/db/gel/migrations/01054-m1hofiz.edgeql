CREATE MIGRATION m1hofizw6gjfliulljzscqynbb3bie665ooqtjgponrtqpaynmhk6a
    ONTO m1qhpchgqt5p6jjxxrzv2pkifahobwyspvsjwkkdcfqyssa3pyohra
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK codeAttrAccess {
          RENAME TO codeAttrsAccess;
      };
  };
};
