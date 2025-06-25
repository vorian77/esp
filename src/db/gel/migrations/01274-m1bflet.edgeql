CREATE MIGRATION m1bfletnxra2gmz3chsqsry3sslkvg4dqe5cvdf6uqm7gwiizpb5oa
    ONTO m1s2b4hedwi27ddr5ddamy4m7nizfonuwevpryrmrqdf4uc7wm2iuq
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (SELECT
              sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_user_type')
          );
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
