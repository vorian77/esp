CREATE MIGRATION m1uewvona47l7csh23xu7tv2sgfqijmm53p7ipmmkjhbswxg33cw3a
    ONTO m1dqedzxrtrhkyep7mc5fxvke3iumap7ofptojfheomrrjeu2ala3q
{
          ALTER TYPE sys_core::SysDataObjTable {
      CREATE MULTI LINK columnsConflict: sys_db::SysColumn;
  };
};
