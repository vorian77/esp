CREATE MIGRATION m1en43lxkmvgr4iw6tpumhqkoamjhoe6bgeo44qagwsejpbqp46pyq
    ONTO m1kr4dgxt3ywkdyqw53lgdyb5tvjiaydeay2h2sayagtzxm3hfynra
{
  ALTER TYPE sys_rep::SysAnalytic {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_analytic'));
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
