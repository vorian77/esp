CREATE MIGRATION m1wi4p5qa2wvtcrg7433h4hawzbu7l4hd76vz4t45x6stitbt23nva
    ONTO m1rhdfprwu56twxpcxsamtuxzmfpbam2f2epckndutumlqiu3w23ka
{
  ALTER TYPE sys_migr::SysMigrTargetColumn {
      CREATE PROPERTY isActive: std::bool;
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      CREATE PROPERTY isActive: std::bool;
  };
};
