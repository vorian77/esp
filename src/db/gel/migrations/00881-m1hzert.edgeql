CREATE MIGRATION m1hzerthramycipkypqnu2n3sjswf7xyj64smcivmpbimg3yapvrva
    ONTO m1htxpncf4dcjhbbacrrnn4uii56kmjklokepukvy7fzfrs7yh5khq
{
  ALTER TYPE sys_user::SysUser {
      DROP PROPERTY isMobileOnly;
  };
};
