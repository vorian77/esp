CREATE MIGRATION m1tzq5a25xttvycazxwf2tcgxyn7i3toq2lkbpaljojp62caogu4vq
    ONTO m1rikb6iuwsbgrtjpkqov4mzqhruk5kiswddi27nctabmeamk6ogia
{
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY testBool: std::bool;
  };
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY testDateTime: cal::local_datetime;
  };
  ALTER TYPE sys_core::SysOrg {
      ALTER PROPERTY testNumber {
          RENAME TO testNumberInt;
      };
  };
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY testNumberFloat: std::float64;
  };
};
