CREATE MIGRATION m1p53uuwcxuatoaktsqk4srbql6fr5ta6df4j3effbapm5f5l55vha
    ONTO m1ehzwturdl7wawcrwx5lwgkivxcbkpgtwsedqvo6m4ah6mu4ezrfa
{
  ALTER TYPE sys_user::SysUserActionShow {
      CREATE LINK codeExprOp: sys_core::SysCode;
      CREATE PROPERTY exprField: std::str;
      CREATE PROPERTY exprValue: std::str;
  };
};
