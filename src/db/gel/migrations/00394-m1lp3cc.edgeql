CREATE MIGRATION m1lp3cctmtukznmsam66th64xpe252k47e7ypxcud7rcqsj5zd7u4a
    ONTO m1dh2ubolw37b3ekxi4vz7mbvoqmog6a4sdflcwjgmhe2omxg34y4a
{
                  ALTER TYPE app_cm::CmCourse {
      CREATE MULTI LINK cohorts: app_cm::CmCohort;
  };
};
