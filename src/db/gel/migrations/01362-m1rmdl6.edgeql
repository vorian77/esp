CREATE MIGRATION m1rmdl6gx5qyud35olkbnleme7jmfs3wqcwrzt3by7nic5jkj3bnzq
    ONTO m14aowccjhftgfknnjt6znyx4edr2yzkje4my3ue7u62fkohn5teva
{
  ALTER TYPE app_cm::CmCsfEligibility {
      CREATE REQUIRED LINK objAttrCmProgram: sys_core::SysObjAttr {
          SET REQUIRED USING (<sys_core::SysObjAttr>{});
      };
  };
};
