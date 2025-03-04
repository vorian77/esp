CREATE MIGRATION m1yfsyhholkc22sqow36x6nijjgms4rkonsqkyuvu5zs5t3ynud3zq
    ONTO m17jovmxqy7mjdpygaalmw4v6pxxcc236oacli7wrtdq3eaxfez3nq
{
              ALTER TYPE app_cm::CmCsfCohort {
      CREATE LINK cohort: app_cm::CmCohort;
  };
};
