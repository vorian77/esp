CREATE MIGRATION m17jovmxqy7mjdpygaalmw4v6pxxcc236oacli7wrtdq3eaxfez3nq
    ONTO m1uvvw5blxgi7lecebtsmknx23ec4kz6r3af44jmhmg3faobd6bq3q
{
                  ALTER TYPE app_cm::CmCohort {
      DROP LINK csfCohorts;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      DROP LINK csfCohortAttds;
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE REQUIRED LINK csfCohort: app_cm::CmCsfCohort {
          SET REQUIRED USING (<app_cm::CmCsfCohort>{});
      };
  };
};
