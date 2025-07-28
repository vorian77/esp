CREATE MIGRATION m13do5q7uk66ej67wjcq475nxz5rti3ltbijtvbmnzwkjetak52eoq
    ONTO m1bq2lbqpep4cxyxt3mdpgxbpafbe7u4tgz7d6pj7xpkgw6h26fyxq
{
  ALTER TYPE sys_core::SysEligibilityNode {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::ObjRootCore LAST;
  };
};
