CREATE MIGRATION m1zf5lu2r5efjy6qe2huqhkriu3tzjzd5fk3uiqq7a2erxgfl4etca
    ONTO m1s4hoslvzuj3db4w3qzmbehtkq6cpdtklihj75d3yn5ovsvaiflgq
{
  ALTER TYPE sys_user::SysUserPref {
      ALTER LINK user {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
