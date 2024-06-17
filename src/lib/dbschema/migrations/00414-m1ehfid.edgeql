CREATE MIGRATION m1ehfidmdtmrqwwa4dwc6is6vuubxfuvkjklp6axivjypyda43aska
    ONTO m1ie7vaxej2doxmswbg5xlcm6b3r52xwjxsc7lt6ynaib5g42wwpaq
{
  ALTER TYPE app_cm::CmCohort {
      CREATE LINK course := (std::assert_single(.<cohorts[IS app_cm::CmCourse]));
  };
  ALTER TYPE app_cm::CmCohort {
      DROP PROPERTY courseId;
  };
};
