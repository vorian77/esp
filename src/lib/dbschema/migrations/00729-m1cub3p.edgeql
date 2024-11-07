CREATE MIGRATION m1cub3ptcrxgjbpebatkeu4mybvvlyd4rop5oq7udcu2it3ilhm7fa
    ONTO m13kiqle3vsapangzhtwugielxhaquu37vpvepfcvlueo52mzccrsa
{
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY certifications {
          RENAME TO courseCertifications;
      };
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY exams {
          RENAME TO courseExams;
      };
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY itemsIncluded {
          RENAME TO courseItemsIncluded;
      };
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY itemsNotIncluded {
          RENAME TO courseItemsNotIncluded;
      };
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY requirements {
          RENAME TO courseRequirements;
      };
  };
};
