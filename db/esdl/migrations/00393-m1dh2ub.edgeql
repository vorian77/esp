CREATE MIGRATION m1dh2ubolw37b3ekxi4vz7mbvoqmog6a4sdflcwjgmhe2omxg34y4a
    ONTO m1ncpkihpbspwi4xwctcaiw5j54huwib44wa5uz7vakxeh3lami3da
{
      ALTER TYPE app_cm::CmCsfCohort {
      ALTER LINK attds {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
