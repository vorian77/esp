CREATE MIGRATION m1w2ity5yl7xoisbulhnk6x4fbvar6bunyqneylmsmcgh44kxeaw6q
    ONTO m1eysshi2kb6db2n2njdhjjxypa736eivvi7xcdprimf45aevnhz7a
{
  ALTER TYPE sys_user::SysUserAction {
      ALTER PROPERTY expr {
          RENAME TO exprAction;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY exprShowExpr: std::str;
  };
};
