CREATE MIGRATION m1oj4xujw7lotpkn42gehef7dujrbu3qiifxc4gwivouoal2ugns3q
    ONTO m16y72m24rxxjb4i4w5l6efp6bhf22fvxqcaxj6boimnl4tx2mhtiq
{
  ALTER TYPE sys_user::SysApp {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_app'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
