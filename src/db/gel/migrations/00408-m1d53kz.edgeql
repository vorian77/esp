CREATE MIGRATION m1d53kzj2r3upjpwued2gdlddhob4uy4xorgpy6dlsdfi7ea675z7q
    ONTO m1yfsyhholkc22sqow36x6nijjgms4rkonsqkyuvu5zs5t3ynud3zq
{
              ALTER TYPE app_cm::CmCsfCohort {
      ALTER LINK cohort {
          SET REQUIRED USING (<app_cm::CmCohort>{});
      };
  };
};
