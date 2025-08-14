CREATE MIGRATION m1cnm5vfco3cltcgw2vx7uxweo7z6jzdwfrqwgrhdkviqjia275nyq
    ONTO m13rgiqub67mtqds2jkiexfidxvmkbatccauduxy5khymzlesbojva
{
  ALTER TYPE app_cm::CmCsfDocument {
      ALTER LINK cmMoedEligVerifyAdvocate {
          RENAME TO cmEligibilityCategories;
      };
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP LINK cmMoedEligVerifyCompliance;
  };
};
