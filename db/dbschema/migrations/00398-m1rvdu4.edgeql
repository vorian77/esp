CREATE MIGRATION m1rvdu4vv2pvvo4muuvt6g52fjg32aiavgksomckkgbrvzyps3tysa
    ONTO m12ea4hysn7zld6nx3gwtlmumk2fohdinyxqgfdtu6yonz3rl6gewq
{
  ALTER TYPE app_cm::CmCohortAttd {
      DROP LINK cohort;
  };
};
