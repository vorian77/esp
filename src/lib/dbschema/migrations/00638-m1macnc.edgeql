CREATE MIGRATION m1macnch4y525rj5as3w6jjqwzoqmolwtkm4dkdbip4mjxjmh3aqjq
    ONTO m1n5rzwswxyhqot3ihjw6hpj6lvy6gt5a7f4dwldvelpdqt22bop7q
{
  ALTER TYPE app_cm::CmClient {
      CREATE LINK owner: sys_core::SysSystem;
  };
};
