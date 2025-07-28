CREATE MIGRATION m1rijgdakvzd363h57wcbp6oaf6xkdc5zv72adms7hodskbud7h56a
    ONTO m1z5zmvsghqopxbf56v3mnt3j2rk57xrydmkbb3n56zdqzwyfpxqha
{
  ALTER TYPE sys_core::SysSystem {
      ALTER PROPERTY appName {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
