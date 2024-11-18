CREATE MIGRATION m1zhbqit4llh7mfz7zskwanwsbk6nbcj76zwarvl6xj4aaxpq2pisq
    ONTO m17uimli247dha4y4sjbh6uxqrqkaq6nqgn2ssw76grrbaaaqtrv3a
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK codeSortDir: sys_core::SysCode;
  };
};
