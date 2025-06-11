CREATE MIGRATION m17xuamq2h22gecs5437dprty2a5fae5esqdaprbyu75llr3fvubsq
    ONTO m1j4zq5hjqfbf6nv7dfzi2pj5wbqrqudmbtfbxfapi4zif7wve3wfq
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_user'));
          SET REQUIRED;
          SET OWNED;
          SET TYPE sys_core::SysCode;
      };
  };
};
