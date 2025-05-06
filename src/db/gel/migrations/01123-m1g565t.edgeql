CREATE MIGRATION m1g565tarcwgv5tnnkhcp456w6kyfitgkumjlis5wyh6wqv2o2ryua
    ONTO m1qwfneafczlv6xun6tlcyje7vrbhzbpqheogtjpow4umkw42t6z7q
{
  CREATE TYPE sys_core::SysQuerySource {
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprSort: std::str;
      CREATE MULTI PROPERTY exprUnions: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
};
