CREATE MIGRATION m1lm3zm66rk66quqqtzpug7eh7op45u36h4e5ylehbs7fce7b7bypq
    ONTO m1xk7ihezaj5crk4c47p6qkacfksjk5eo56wssdyoyjdk3fo4nmc2a
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmProgramOld {
          RESET OPTIONALITY;
      };
      ALTER LINK objAttrCmSiteOld {
          RESET OPTIONALITY;
      };
  };
};
