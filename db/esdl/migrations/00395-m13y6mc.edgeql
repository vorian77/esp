CREATE MIGRATION m13y6mcbiiwltwm73632hvxhzmnx55u5gpeoogrdwebldn6d2j5aqa
    ONTO m1lp3cctmtukznmsam66th64xpe252k47e7ypxcud7rcqsj5zd7u4a
{
      ALTER TYPE app_cm::CmCohort {
      CREATE MULTI LINK csfCohorts: app_cm::CmCsfCohort;
  };
};
