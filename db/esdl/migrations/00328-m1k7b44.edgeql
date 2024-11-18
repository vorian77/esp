CREATE MIGRATION m1k7b44n62lkm5qosmuwqvxmw2ie53i6esmxpmujrdnxsa7k37s6yq
    ONTO m12xuyb4qjqc6cdor4a4jv2rnhhryhuse3nrqqglb4yagk7k5ev7yq
{
      ALTER TYPE app_cm::CmCohort {
      CREATE MULTI LINK attds: app_cm::CmCohortAttd;
  };
  ALTER TYPE app_cm::CmCohortAttd {
      DROP LINK csfCohortAttd;
  };
  ALTER TYPE app_cm::CmCsfCohort {
      CREATE MULTI LINK attds: app_cm::CmCsfCohortAttd {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      DROP CONSTRAINT std::exclusive ON ((.csfCohort, .cohortAttd));
      DROP LINK csfCohort;
      ALTER PROPERTY computedHours {
          USING (SELECT
              .codeCmCohortAttdDuration.valueDecimal
          );
      };
  };
};
