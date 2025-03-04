CREATE MIGRATION m1uvzkut6vnr27qvfwurup5uevejjrigzfcdb5x5ynkfrn2hr7oyfq
    ONTO m1zf5lu2r5efjy6qe2huqhkriu3tzjzd5fk3uiqq7a2erxgfl4etca
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY exprObject;
  };
  ALTER TYPE sys_rep::SysRep {
      DROP PROPERTY exprObject;
  };
};
