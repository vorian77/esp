CREATE MIGRATION m1jkhmag35as4px46i3jlwnpyugdizxhcudyflurgvrz7r3x3a7evq
    ONTO m1bfletnxra2gmz3chsqsry3sslkvg4dqe5cvdf6uqm7gwiizpb5oa
{
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_user_type'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
