CREATE MIGRATION m1clo2ym7mwh4s6gp6tz2nlv4omxbkxciynapbcrmmruqxprjqcd7a
    ONTO m1vf3lc5mzf2hd4sxnwkqbynzusoddmyigwzbex562qbsjxxxwf76a
{
  ALTER TYPE sys_core::ObjRoot {
      DROP PROPERTY header;
  };
};
