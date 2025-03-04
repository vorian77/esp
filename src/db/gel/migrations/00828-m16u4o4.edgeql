CREATE MIGRATION m16u4o4hql26rva3nqpamulue3as67a7pdneyyqu2lprkbrphrmzha
    ONTO m1uewvona47l7csh23xu7tv2sgfqijmm53p7ipmmkjhbswxg33cw3a
{
          ALTER TYPE sys_core::SysDataObjTable {
      ALTER LINK columnsConflict {
          ON TARGET DELETE ALLOW;
      };
  };
};
