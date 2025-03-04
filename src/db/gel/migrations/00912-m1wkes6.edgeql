CREATE MIGRATION m1wkes6ttzpfkm3blro4ux7kwhq2cjytua2cze4tazzvdsqbplvuia
    ONTO m17use7lvnjf5rdm2artpcytfczse6tng5ndmvqdzkakdgg77qstgq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY actionAlertMsg: std::str;
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY actionAlertMsg: std::str;
  };
};
