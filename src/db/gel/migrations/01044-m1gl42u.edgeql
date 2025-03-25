CREATE MIGRATION m1gl42urxz2wze374jwqhos5dnbug5s2jhvmeufwbbs7qkjdkpgpha
    ONTO m15l6stjapnn7gjd36wv2lbpbj6raq65tfz2ywy66fazlp2oj3ll2q
{
  ALTER TYPE sys_core::SysAttr RENAME TO sys_core::SysAttrAccess;
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE LINK codeAttributeAccess: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY isOpen {
          SET REQUIRED USING (<std::bool>{true});
      };
  };
};
