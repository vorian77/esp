CREATE MIGRATION m1a4ma6znsxo6wn2yzph6slktje5kcz3dgiiy6w7zuyibrzjrumkfa
    ONTO m1i4ajlnvw56avujd4vut5t4qf37ciwb4rywcs7la4yz4ilayx23ia
{
      ALTER TYPE app_cm_analytic::CmAnalyticDoc {
      CREATE LINK user: sys_user::SysUser;
  };
  ALTER TYPE app_cm_analytic::CmAnalyticDoc {
      DROP PROPERTY userId;
  };
};
