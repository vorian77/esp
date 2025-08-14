CREATE MIGRATION m12a2nhmcwnr47hnlwo62zzke3zxnnukyyn4lcgzlrphzcy2y26v5q
    ONTO m1cnm5vfco3cltcgw2vx7uxweo7z6jzdwfrqwgrhdkviqjia275nyq
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
