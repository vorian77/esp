CREATE MIGRATION m1zejkxwkcgmqtgigecfnisoih3w76pryrosyedsw7tp6fmujdys2a
    ONTO m1o45z6tglx73ssh4cfckaamw7alurckr37rqf4dgjmnkjdxypkdra
{
  ALTER TYPE sys_user::SysUserAction {
      ALTER PROPERTY exprActionShows {
          RENAME TO exprActionShow;
      };
  };
};
