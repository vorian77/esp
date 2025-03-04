CREATE MIGRATION m14klcke7vy4q4ko37apiqmnvoas6pclty3rzayngmkh2xfqzexhmq
    ONTO m1clo2ym7mwh4s6gp6tz2nlv4omxbkxciynapbcrmmruqxprjqcd7a
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY headerNew {
          RENAME TO header;
      };
  };
};
