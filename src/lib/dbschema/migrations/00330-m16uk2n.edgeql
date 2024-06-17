CREATE MIGRATION m16uk2nngo524v3vib7xfxfzsizd7onz2kxihtmquzsrtlrmueyl5q
    ONTO m12fls75ggiybkrmug5vhd73vc5el5jkmndfqzfp7ou4cyfq4i2uda
{
  ALTER TYPE app_cm::CmCsfCohort {
      DROP LINK attds;
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE REQUIRED LINK csfCohort: app_cm::CmCsfCohort {
          SET REQUIRED USING (<app_cm::CmCsfCohort>{});
      };
  };
};
