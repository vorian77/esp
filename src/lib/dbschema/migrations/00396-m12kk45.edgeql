CREATE MIGRATION m12kk45ut2fkqtwczahxwmdo733g7jpie2ebbt2nj6e3fs7bn6r3sa
    ONTO m13y6mcbiiwltwm73632hvxhzmnx55u5gpeoogrdwebldn6d2j5aqa
{
  ALTER TYPE app_cm::CmCohort {
      ALTER LINK attds {
          RENAME TO attdsCohort;
      };
  };
  ALTER TYPE app_cm::CmCohort {
      DROP LINK course;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      ALTER LINK attds {
          RENAME TO attdsCsfCohort;
      };
  };
  ALTER TYPE app_cm::CmCsfCohort {
      DROP LINK cohort;
  };
};
