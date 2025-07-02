CREATE MIGRATION m1xyqk34ljwpcfib4wodwfrg5oofbumbm22bzwhncvonbjijjuu6zq
    ONTO m1en43lxkmvgr4iw6tpumhqkoamjhoe6bgeo44qagwsejpbqp46pyq
{
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_analytic'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
