CREATE MIGRATION m12aqhqf5knjlsolasnavh4ds5jltyhjm3egnkfc46kxrpvjskddta
    ONTO m1ehfidmdtmrqwwa4dwc6is6vuubxfuvkjklp6axivjypyda43aska
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      ALTER LINK dataObjEmbed {
          ON SOURCE DELETE ALLOW;
      };
      ALTER LINK dataObjModal {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      ALTER LINK dataObjList {
          ON SOURCE DELETE ALLOW;
      };
  };
};
