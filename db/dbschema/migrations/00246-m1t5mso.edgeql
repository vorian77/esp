CREATE MIGRATION m1t5mso6lbymyxxxwb6v3fqenllv7x5m3ckf37yna7oeq73z7xldsq
    ONTO m1csef5uxco3z2d6xkqs5ny3xofzjpg7ddor7n7jv2yjjiscqx64uq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY order {
          SET default := 10000;
      };
  };
};
