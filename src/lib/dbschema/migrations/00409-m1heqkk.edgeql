CREATE MIGRATION m1heqkkqjruz7mocpzi7i7inlv6na4nakulqbxgb52crofuh7u2t5a
    ONTO m1d53kzj2r3upjpwued2gdlddhob4uy4xorgpy6dlsdfi7ea675z7q
{
  ALTER TYPE app_cm::CmCohort {
      CREATE LINK course := (.<cohorts[IS app_cm::CmCourse]);
  };
};
