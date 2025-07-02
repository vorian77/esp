CREATE MIGRATION m1wvjc62uc4zoimpvzpxgtyudsz7fcsetuoes7canjxyax6z5cdgjq
    ONTO m1ejktiwcfgorrm4cqav54u2k2ucq6i5ewv66l3mm76avrt7d6fdxa
{
  ALTER TYPE sys_user::SysUser {
      DROP TRIGGER sys_user_delete;
  };
};
