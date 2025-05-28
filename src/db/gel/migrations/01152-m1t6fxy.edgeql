CREATE MIGRATION m1t6fxyvxoxhmta73b73hbhz73pte26dmj6rivovkqsefrnujvoeua
    ONTO m1lbsxlxb4nn7sasjckkkczztnf7yg7q2qdi444l7i6xfjfeygg6ca
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK attrObjSite {
          SET REQUIRED USING (<sys_core::SysObjAttr>{});
      };
  };
};
