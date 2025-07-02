CREATE MIGRATION m1wy3j3mguyh72fd52gvaqoheunswn7zebmh7wt77okozbnxgvpvwa
    ONTO m12a35maioewya5ze5iv3dg7ndvn23ms3ks327mkoinyuaonyixbmq
{
  ALTER TYPE sys_core::SysCodeAction {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_code_action'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
