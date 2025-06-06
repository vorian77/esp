CREATE MIGRATION m1py2q77tayazlm6vsfu7ybbb22tgvme7oixv6vqydhlb3xn62b7ga
    ONTO m1zejkxwkcgmqtgigecfnisoih3w76pryrosyedsw7tp6fmujdys2a
{
  ALTER TYPE sys_user::SysUserAction {
      ALTER PROPERTY exprActionConfirm {
          RENAME TO exprShow;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      DROP PROPERTY exprActionShow;
  };
};
