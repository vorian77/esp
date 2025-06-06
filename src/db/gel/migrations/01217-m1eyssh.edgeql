CREATE MIGRATION m1eysshi2kb6db2n2njdhjjxypa736eivvi7xcdprimf45aevnhz7a
    ONTO m1bylnp4nqv4orsw2ccuct4tg47yygh2cdxgoglo7mge3udi4xqlmq
{
  ALTER TYPE sys_user::SysUserAction {
      DROP LINK actionShows;
  };
  ALTER TYPE sys_user::SysUserActionConfirm {
      DROP PROPERTY isNot;
  };
  DROP TYPE sys_user::SysUserActionShow;
};
