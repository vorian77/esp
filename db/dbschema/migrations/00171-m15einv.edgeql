CREATE MIGRATION m15einvo6dwomvvh4noz2iwnbzzncl3vmbzbp6oaweprkt3eqnjv7q
    ONTO m1rqwz5rhqhiiicez23t3hv5dfdbznlx6ps76iblvhltjj3mwnzhja
{
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE LINK csfCohortAttd := (.<cohortAttd[IS app_cm::CmCsfCohortAttd]);
  };
};
