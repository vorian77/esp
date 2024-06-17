CREATE MIGRATION m1hhwc4suutgb232fe24h5namxqs7ktud3sokz26wj2tbrosmljmza
    ONTO m1kwxdnli5bdvrcgtw2vdwxzsscqeco7uqgpl7qkwv723i67of7dla
{
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE LINK cohort := (std::assert_single(.<cohortAttds[IS app_cm::CmCohort]));
  };
};
