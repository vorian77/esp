CREATE MIGRATION m173pznkvh6ji7disatilij2e7rmm5utums7jnr2z5dwisuvoxurra
    ONTO m1ttkcypatotwzo32tvz3uh4zu2jkchioxyi7vawzh6blh7voyrrfq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmProgram {
          RENAME TO program;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmSite {
          RENAME TO site;
      };
  };
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER LINK objAttrCmProgram {
          RENAME TO program;
      };
  };
  ALTER TYPE app_cm::CmSite {
      CREATE LINK eligibility: sys_core::SysEligibility;
  };
};
