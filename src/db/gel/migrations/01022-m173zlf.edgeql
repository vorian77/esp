CREATE MIGRATION m173zlfqowlsjbipgauyxdtwmibvd2p6j7lw3knrr6jbdk63xrnw4q
    ONTO m17vc3rqflhmbmkhacaobhn5kxcertrj4yyw2hc7paoq2gpcomahxa
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeServiceFlowEligibilityStatus {
          RENAME TO codeSfEligibilityStatus;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeServiceFlowEnrollType {
          RENAME TO codeSfEnrollType;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeServiceFlowOutcome {
          RENAME TO codeSfOutcome;
      };
  };
};
