CREATE MIGRATION m1qigo47vv7r4nbutk542yvpqllfxskhiqigkjkheyafty3lh4ky6a
    ONTO m1py2q77tayazlm6vsfu7ybbb22tgvme7oixv6vqydhlb3xn62b7ga
{
  ALTER TYPE sys_user::SysUserAction {
      CREATE REQUIRED LINK codeConfirm: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
