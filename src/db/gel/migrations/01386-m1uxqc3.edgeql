CREATE MIGRATION m1uxqc35x7ugsqdo24cnaccsbd6bozxha6gicrvbaaf6ygroizqotq
    ONTO m1oykj3ck4sglgwu676n63mfgwf3t5xuzi4upandcbvxowgr73tbia
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK program {
          RENAME TO cmProgram;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK site {
          RENAME TO cmSite;
      };
  };
  ALTER TYPE app_cm::CmProgram {
      ALTER LINK eligibility {
          RENAME TO sysEligibility;
      };
  };
};
