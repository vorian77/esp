CREATE MIGRATION m1bqypqwj25vjvbjgr4ja3zawe5fm437x42mnkbhchkslf5xtaqqha
    ONTO m1rvdu4vv2pvvo4muuvt6g52fjg32aiavgksomckkgbrvzyps3tysa
{
                  ALTER TYPE app_cm::CmCohort {
      ALTER LINK attdsCohort {
          ON TARGET DELETE ALLOW;
      };
  };
};
