CREATE MIGRATION m16y72m24rxxjb4i4w5l6efp6bhf22fvxqcaxj6boimnl4tx2mhtiq
    ONTO m1xyqk34ljwpcfib4wodwfrg5oofbumbm22bzwhncvonbjijjuu6zq
{
  ALTER TYPE sys_rep::SysRep {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_report'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
