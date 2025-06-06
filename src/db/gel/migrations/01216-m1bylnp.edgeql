CREATE MIGRATION m1bylnp4nqv4orsw2ccuct4tg47yygh2cdxgoglo7mge3udi4xqlmq
    ONTO m1qigo47vv7r4nbutk542yvpqllfxskhiqigkjkheyafty3lh4ky6a
{
  ALTER TYPE sys_user::SysUserAction {
      ALTER LINK codeConfirm {
          RENAME TO codeConfirmType;
      };
  };
};
