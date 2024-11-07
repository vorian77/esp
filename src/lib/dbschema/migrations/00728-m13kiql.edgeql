CREATE MIGRATION m13kiqle3vsapangzhtwugielxhaquu37vpvepfcvlueo52mzccrsa
    ONTO m1f6co2vjegeyhssbn5rkpdriloe4ica3x2dzpkryliheaxxkewrwq
{
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiCerts;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiExams;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiItemsIncluded;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiItemsNotIncluded;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK codeMultiRqmts;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY certifications: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY exams: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY itemsIncluded: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY itemsNotIncluded: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE PROPERTY requirements: std::str;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      DROP PROPERTY dateEnd;
      DROP PROPERTY dateEndEst;
      DROP PROPERTY dateReferral;
      DROP PROPERTY dateStart;
      DROP PROPERTY dateStartEst;
  };
};
