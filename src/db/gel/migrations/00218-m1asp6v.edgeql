CREATE MIGRATION m1asp6vt42o2g6tyuucv4rfhkzkwpnimffqbrz64j2eumwig2wkrxq
    ONTO m1ikqslzntgybebfkplum6u2vpwqum6jzr5tvb4whya62rjny62qbq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY linkExprPreset: std::str;
  };
};
