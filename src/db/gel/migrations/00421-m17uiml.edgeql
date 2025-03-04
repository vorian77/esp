CREATE MIGRATION m17uimli247dha4y4sjbh6uxqrqkaq6nqgn2ssw76grrbaaaqtrv3a
    ONTO m1bcjhjef42ba453nyt5beqgavzqblkh7y7mgxlxgkizlr4qqb5n7q
{
              ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY exprOrder {
          RENAME TO exprSort;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER PROPERTY exprOrder {
          RENAME TO exprSort;
      };
  };
  ALTER TYPE sys_rep::SysRep {
      ALTER PROPERTY exprOrder {
          RENAME TO exprSort;
      };
  };
};
