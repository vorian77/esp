CREATE MIGRATION m14m2hsp3wg5unpjerqeux5ixnsllmzaq3tuzk4gdsknptbq5yaf4a
    ONTO m1xz3qxp54ip3cecw6psowdgrzi3fc5uw4qh2etr5fackfop4cxqma
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK serviceFlow {
          RENAME TO programCm;
      };
  };
};
