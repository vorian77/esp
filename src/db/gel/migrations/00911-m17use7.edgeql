CREATE MIGRATION m17use7lvnjf5rdm2artpcytfczse6tng5ndmvqdzkakdgg77qstgq
    ONTO m1hgjvt3iymxb5nkx3lzhm5eavvnmz6dnmlkgnz3eneyk53aeizgma
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK codeAction;
      DROP LINK customColCodeColor;
  };
};
