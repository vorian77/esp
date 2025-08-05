CREATE MIGRATION m1lsxhczlfonwlk5xnvlgg2lpvk25bscui36pnuotxrmyeuohzgjxq
    ONTO m173pznkvh6ji7disatilij2e7rmm5utums7jnr2z5dwisuvoxurra
{
  ALTER TYPE app_cm::CmProgram {
      CREATE LINK eligibility: sys_core::SysEligibility;
  };
  ALTER TYPE app_cm::CmSite {
      DROP LINK eligibility;
  };
};
