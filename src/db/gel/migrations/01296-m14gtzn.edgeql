CREATE MIGRATION m14gtznlpx5ikvav4ss2n52dx524swhvhprn2krq6t6lpe7hxqxyga
    ONTO m1wvjc62uc4zoimpvzpxgtyudsz7fcsetuoes7canjxyax6z5cdgjq
{
  ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          RESET default;
      };
  };
};
