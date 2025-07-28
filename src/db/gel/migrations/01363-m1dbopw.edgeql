CREATE MIGRATION m1dbopwsv4tiexuoqtyiqhu7x5dhdejculuq6jeeyjef6ugqgrdzfq
    ONTO m1rmdl6gx5qyud35olkbnleme7jmfs3wqcwrzt3by7nic5jkj3bnzq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER LINK nodesValue {
          RENAME TO nodeValues;
      };
  };
};
