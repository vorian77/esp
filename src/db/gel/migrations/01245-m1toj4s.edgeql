CREATE MIGRATION m1toj4shqvvwsiwfmx5lzdnrtjoswz7jckm627q7zm3q67w5c3pxcq
    ONTO m1ujcq73v2tfottgs4wvwdpiemyuts2m4t2rzhiflucip67pbgrfha
{
  ALTER TYPE sys_core::SysSystem {
      ALTER LINK nodesConfig {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
