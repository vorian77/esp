CREATE MIGRATION m1t3p5gv5ryidyqeexnerjnd3t6r3u3tlye4d26ppgqy23r4bahbqa
    ONTO m1gwfjc72zh2upjotb7tlgmvqqocrq2g3jg4xxwurawyu4jpm6kfjq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmProgram {
          RENAME TO objAttrCmProgramOld;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmSite {
          RENAME TO objAttrCmSiteOld;
      };
  };
};
