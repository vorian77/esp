CREATE MIGRATION m12fls75ggiybkrmug5vhd73vc5el5jkmndfqzfp7ou4cyfq4i2uda
    ONTO m1k7b44n62lkm5qosmuwqvxmw2ie53i6esmxpmujrdnxsa7k37s6yq
{
                  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY computedHours {
          USING (SELECT
              (.codeCmCohortAttdDuration.valueDecimal * .cohortAttd.hours)
          );
      };
  };
};
