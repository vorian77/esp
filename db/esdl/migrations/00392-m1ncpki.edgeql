CREATE MIGRATION m1ncpkihpbspwi4xwctcaiw5j54huwib44wa5uz7vakxeh3lami3da
    ONTO m17c2nljnqbenmyb7jj6n23c5ebdmmf24s7osut6tsvsjw3opwsora
{
      ALTER TYPE app_cm::CmCsfCohort {
      CREATE MULTI LINK attds: app_cm::CmCsfCohortAttd;
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      DROP LINK csfCohort;
  };
};
