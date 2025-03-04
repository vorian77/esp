CREATE MIGRATION m1d2lrykeifktfm47cr6tavrgmdpnuslqkzsq6agjkwkdhyypmiczq
    ONTO m1ixiy75qxu3nk5z3xp3ik2vg3fohie7sxvvwvmbrfktwwrhr6tbfq
{
          CREATE TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE MULTI LINK propsNew: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
