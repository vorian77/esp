CREATE MIGRATION m1jktk2sablgvh73kqjik4rrnf2oqcfqe4efbhokhncyz4cgt6ordq
    ONTO m14v7q3xvbiysor5rzmjfuktcfz5klucfxmpzozafy5zgkpaji3aka
{
  ALTER TYPE sys_core::SysEligibilityNode {
      ALTER PROPERTY nodeId {
          RENAME TO nodeIdx;
      };
  };
  ALTER TYPE sys_core::SysEligibilityNode {
      ALTER PROPERTY nodeIdDependent {
          RENAME TO nodeIdxDependent;
      };
  };
  ALTER TYPE sys_core::SysEligibilityNode {
      ALTER PROPERTY nodeIdParent {
          RENAME TO nodeIdxParent;
      };
  };
};
