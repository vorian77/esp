CREATE MIGRATION m1kgsusmjimlk6wjfziy4s7e7eyakci5wloo4llqtrd4xfqnk4eqgq
    ONTO m1o76vbtm36l2u5tcdpt5v2sunzlan5yiyeg3qxzfeosacq7h7e4xa
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeServiceFlowType {
          RENAME TO codeServiceEnrollType;
      };
  };
};
