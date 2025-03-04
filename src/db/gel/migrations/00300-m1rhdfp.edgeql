CREATE MIGRATION m1rhdfprwu56twxpcxsamtuxzmfpbam2f2epckndutumlqiu3w23ka
    ONTO m1b73s27bgqwdqlrjimex7nnb44ah4gnsm6fskighttvsrp6ms2csq
{
                  ALTER TYPE sys_migr::SysMigrTargetTable {
      CREATE REQUIRED PROPERTY order: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
