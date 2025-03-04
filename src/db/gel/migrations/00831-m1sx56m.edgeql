CREATE MIGRATION m1sx56ms7omgmys74xpy66juoufuldk5iwippzwztr5pc7s3wj642q
    ONTO m1462546eybswqpgervuoynnclwwlmkiirwnntwnr6thjvg4letdmq
{
          ALTER TYPE sys_core::SysDataObjTable {
      DROP LINK tableRoot;
  };
};
