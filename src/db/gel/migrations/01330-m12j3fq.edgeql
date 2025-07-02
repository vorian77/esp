CREATE MIGRATION m12j3fq5qrykxzewjxp25yzek4zdc5wbrpij2ehr7yjg6lfvfaeyea
    ONTO m1wy3j3mguyh72fd52gvaqoheunswn7zebmh7wt77okozbnxgvpvwa
{
  ALTER TYPE sys_migr::SysMigr {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttr LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_migr_migration'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
