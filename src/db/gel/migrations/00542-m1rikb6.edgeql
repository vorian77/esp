CREATE MIGRATION m1rikb6iuwsbgrtjpkqov4mzqhruk5kiswddi27nctabmeamk6ogia
    ONTO m1dxvnjdn26zcn7eiqub3uwhooq7s7lm445qtfbooscty3rl2rnt7q
{
              ALTER TYPE sys_core::SysOrg {
      CREATE LINK testCodeSingle: sys_core::SysCode;
  };
};
