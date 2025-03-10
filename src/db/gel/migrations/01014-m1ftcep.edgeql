CREATE MIGRATION m1ftcepldbmlairqhaqjq65fwsvmtij6rk3lwbvtvjsabwwtuubqqa
    ONTO m1kgsusmjimlk6wjfziy4s7e7eyakci5wloo4llqtrd4xfqnk4eqgq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeServiceEnrollType {
          RENAME TO codeServiceFlowEnrollType;
      };
  };
};
