CREATE MIGRATION m1hupnj3hjmhq5yg2d46zbosa52ec6mtc2hdjk5kkga2bkqw47udma
    ONTO m1l2waz7mjcfdvwniwygekuz4p24xzvxhsuqokckkzp666b2q3yfga
{
      ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY listSingleRecord {
          RENAME TO isListSingleRecord;
      };
  };
};
