CREATE MIGRATION m1as5uezjcfuyi3krk3epupu7brrearlxpd3kgxuh7kapgu4rmgskq
    ONTO m12m3sdulmdksdeg2e4eqgkhb3xi5k7djabfgsrtvw3s4p7edcxeca
{
          ALTER TYPE sys_rep::SysRepParm {
      DROP LINK dataObjSelect;
  };
};
