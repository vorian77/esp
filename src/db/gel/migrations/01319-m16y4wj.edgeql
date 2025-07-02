CREATE MIGRATION m16y4wjtqq4yfvd5kxqgadf2wvym3gv4oraxnahjn2yig4g3dy6ywq
    ONTO m1eguul6iixzpgbymengtociplp22sjsxwxrxo2glo5kjhsmemrrpq
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK columns {
          RESET OPTIONALITY;
      };
  };
};
