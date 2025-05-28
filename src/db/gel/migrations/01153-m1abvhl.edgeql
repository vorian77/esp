CREATE MIGRATION m1abvhlrno77gbca6xe5g43x5sh43qkprfemkaroxfz2auzrpax2uq
    ONTO m1t6fxyvxoxhmta73b73hbhz73pte26dmj6rivovkqsefrnujvoeua
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK attrObjSite {
          RENAME TO objAttrCmSite;
      };
  };
};
