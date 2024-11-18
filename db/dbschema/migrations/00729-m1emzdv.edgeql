CREATE MIGRATION m1emzdvn3rnvb57eca4v3a3hdcsoatgeuqgct7dbgusukvlphyqgba
    ONTO m1koc3slykdvxir4kf6wkoonnze7grumjlgjgnfuq3dg4s3fru7wua
{
  ALTER TYPE sys_rep::SysRepUser {
      ALTER LINK analytics {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK parms {
          ON SOURCE DELETE DELETE TARGET;
      };
      ALTER LINK report {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
