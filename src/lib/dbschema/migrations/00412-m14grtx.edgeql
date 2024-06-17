CREATE MIGRATION m14grtxk6npmlm2uszo5billnqophrjlwzbl6gajb5rheyfb6cwgjq
    ONTO m1hhwc4suutgb232fe24h5namxqs7ktud3sokz26wj2tbrosmljmza
{
  ALTER TYPE app_cm::CmCohort {
      CREATE PROPERTY courseId := (std::assert_single(.<cohorts[IS app_cm::CmCourse].id));
  };
};
