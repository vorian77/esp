CREATE MIGRATION m1nblxreiqm6sgquck24lw3cyntrp7743muqan3djf22wwh4wzvzta
    ONTO m1ya35rfuj6aydgpgbg75ymxmk3qre3pvr454fvshicvbqdsp4laqa
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_user'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
