CREATE MIGRATION m1vrzyiugwpujffcdua55nboeqyipvlr33pdknkjku6uvin4qqofbq
    ONTO m1j2papgixisagyl5prqkn7uc3tguzwla3bfujc4ez7zjr564d3y7q
{
  ALTER TYPE sys_core::SysDataObjStyle {
      ALTER PROPERTY prop {
          RENAME TO styleProp;
      };
  };
  ALTER TYPE sys_core::SysDataObjStyle {
      ALTER PROPERTY propValue {
          RENAME TO styleValue;
      };
  };
};
