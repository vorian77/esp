CREATE MIGRATION m13rgiqub67mtqds2jkiexfidxvmkbatccauduxy5khymzlesbojva
    ONTO m1ct4xrfhrptqazcjozhfkc6iwru5gvsfnmfe35msrqwerhtbxuowq
{
  ALTER TYPE app_cm::CmCsfDocument {
      ALTER LINK cmEligibilityCategories {
          RENAME TO cmMoedEligVerifyAdvocate;
      };
  };
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE MULTI LINK cmMoedEligVerifyCompliance: sys_core::SysCodeType;
  };
};
