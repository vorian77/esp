CREATE MIGRATION m1rmcuzod4awupsrdxvtbj74nmymacsykzvn27laajvg4gltjsluvq
    ONTO m1cn2lwe533rhb4v5wpatloqbjzyiofuftrsotxsffyjskeobbmx4q
{
  ALTER TYPE sys_core::SysOrg {
      DROP PROPERTY appName;
      DROP PROPERTY file;
      DROP PROPERTY logoMarginRight;
      DROP PROPERTY logoWidth;
  };
};
