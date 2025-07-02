CREATE MIGRATION m1nztlx4dp4cbyfqfhhukstv25o37abpt44vclx3zi35ocw5qkuusa
    ONTO m12j3fq5qrykxzewjxp25yzek4zdc5wbrpij2ehr7yjg6lfvfaeyea
{
  ALTER TYPE sys_rep::SysRep {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_rep_report'));
      };
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_user_task'));
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_user_user_action'));
      };
  };
};
