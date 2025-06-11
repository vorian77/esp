CREATE MIGRATION m1mdypvjffc66blm7t4ivoifkwddb46k2uoffd5n576juqrfqm3poq
    ONTO m1i43murwhgegdl5kfojfhwvennezkyrfoh56fgrovyhkiirwx6xxa
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK owner {
          RENAME TO ownerOld;
      };
  };
};
