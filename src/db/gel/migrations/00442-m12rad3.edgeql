CREATE MIGRATION m12rad3n4iskdvi2inzirsefh4z6at5eauextff5otybieh2bdquwa
    ONTO m1tg63sf6g7egtxufogk72cbmmj2xxpyzthvfn4obz5ptoq6whnbnq
{
              ALTER TYPE sys_rep::SysRepUserEl {
      DROP PROPERTY orderDefine;
      DROP PROPERTY orderDisplay;
  };
};
