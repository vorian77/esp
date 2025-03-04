CREATE MIGRATION m15gmur4bfq6tj637bm5n2ke3g23ndwowtw6k6m5hogwixzss4cuqa
    ONTO m1joyk6ppzow2p5yze7eofebdkq4fdzwn5matvhki6cvchyrlfiyha
{
          ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeReferralEndType {
          RENAME TO codeServiceFlowOutcome;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeReferralType {
          RENAME TO codeServiceFlowType;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER PROPERTY dateReferral {
          RENAME TO dateCreated;
      };
  };
};
