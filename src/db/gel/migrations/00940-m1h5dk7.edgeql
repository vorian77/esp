CREATE MIGRATION m1h5dk7pwi7qahwgmxy4xnsqqi63vvwphsbnpsskrnjmdhqhn65wnq
    ONTO m1pejibfisiqa2qjdji6hjsoylqi27w6223wrnpkqioxkmpra5foua
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attributes {
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_core::SysAttr {
      ALTER LINK obj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
