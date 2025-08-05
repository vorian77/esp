CREATE MIGRATION m1ttkcypatotwzo32tvz3uh4zu2jkchioxyi7vawzh6blh7voyrrfq
    ONTO m1lm3zm66rk66quqqtzpug7eh7op45u36h4e5ylehbs7fce7b7bypq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      DROP LINK objAttrCmProgramOld;
      DROP LINK objAttrCmSiteOld;
  };
};
