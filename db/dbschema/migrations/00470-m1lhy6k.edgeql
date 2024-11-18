CREATE MIGRATION m1lhy6kbbd6b4kzzywfellmwafseebcsjdv7ypxnbltgpez7thpfva
    ONTO m1xaqsivpackxf2lqbq5rm4z6f7j2dzuiegzft3kxvbmm47f3oansa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isExcludeDisplay: std::bool;
  };
};
