CREATE MIGRATION m1uflvotutpgschbrcegobnhyvmbhtzhu4b4rm2hz7vql6hpbaockq
    ONTO m1q5zgmx66jime2n5hplvjdxa5cdgvr2sbge55qactsaawevak5nuq
{
      ALTER TYPE app_cm::CmCohort {
      ALTER LINK attdsCohorts {
          RENAME TO cohortAttds;
      };
  };
  ALTER TYPE app_cm::CmCsfCohort {
      ALTER LINK attdsCsfCohort {
          RENAME TO csfCohortAttds;
      };
  };
};
