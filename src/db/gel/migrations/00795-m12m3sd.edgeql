CREATE MIGRATION m12m3sdulmdksdeg2e4eqgkhb3xi5k7djabfgsrtvw3s4p7edcxeca
    ONTO m13vgcuyi2j5idrf47tcyqdhw5ofrlcoyuzovwjd72ea2tvunr3a6q
{
          ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE PROPERTY orderSort: default::nonNegative;
  };
};
