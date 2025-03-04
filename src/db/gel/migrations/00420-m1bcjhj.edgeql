CREATE MIGRATION m1bcjhjef42ba453nyt5beqgavzqblkh7y7mgxlxgkizlr4qqb5n7q
    ONTO m1wenwdonhszvdynzpvsp6g75bhweabuk27qhahid5pzeavrejv74q
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY dbSortOrder {
          RENAME TO dbOrderSort;
      };
  };
};
