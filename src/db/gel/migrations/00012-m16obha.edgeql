CREATE MIGRATION m16obhayvz6xfnb2apd7v6xgvjpnfvnxptg7nukpxghw3t33pmzkka
    ONTO m1vrzyiugwpujffcdua55nboeqyipvlr33pdknkjku6uvin4qqofbq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK gridStyles {
          RENAME TO formStyles;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK gridStyles {
          RENAME TO columnStyles;
      };
  };
};
