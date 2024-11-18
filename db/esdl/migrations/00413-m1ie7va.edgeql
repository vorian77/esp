CREATE MIGRATION m1ie7vaxej2doxmswbg5xlcm6b3r52xwjxsc7lt6ynaib5g42wwpaq
    ONTO m14grtxk6npmlm2uszo5billnqophrjlwzbl6gajb5rheyfb6cwgjq
{
  ALTER TYPE app_cm::CmCohort {
      DROP LINK course;
  };
  ALTER TYPE app_cm::CmCohortAttd {
      DROP LINK cohort;
  };
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE PROPERTY cohortId := (std::assert_single(.<cohortAttds[IS app_cm::CmCohort].id));
  };
};
