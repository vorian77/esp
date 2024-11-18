CREATE MIGRATION m1wenwdonhszvdynzpvsp6g75bhweabuk27qhahid5pzeavrejv74q
    ONTO m15rb4jdxwkqkk5j4oogrxpo6nypceougwm5msxrkx6x5s4565ouia
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeDbListDir {
          RENAME TO codeDbSortDir;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY dbOrderList {
          RENAME TO dbSortOrder;
      };
  };
};
