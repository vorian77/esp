CREATE MIGRATION m1koc3slykdvxir4kf6wkoonnze7grumjlgjgnfuq3dg4s3fru7wua
    ONTO m13rjldijkez43d2zryq52k7yovsao35yy267nnrljj4tp7deiqyrq
{
              ALTER TYPE sys_rep::SysRepUser {
      ALTER LINK analytics {
          RESET ON SOURCE DELETE;
          RESET ON TARGET DELETE;
      };
      ALTER LINK parms {
          RESET ON SOURCE DELETE;
      };
  };
};
