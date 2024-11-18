CREATE MIGRATION m1obd3rzp7zwwncm5msv3b77crhpnvagwxyvb7hvkzra2wv2r4u2kq
    ONTO m1x4max2mc5222df6denv7q2osrvnyis3nbl2vieq2uh4myntp44fa
{
      ALTER TYPE sys_migr::SysMigrTargetTable {
      CREATE PROPERTY isInitTable: std::bool;
  };
};
