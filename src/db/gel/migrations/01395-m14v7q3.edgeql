CREATE MIGRATION m14v7q3xvbiysor5rzmjfuktcfz5klucfxmpzozafy5zgkpaji3aka
    ONTO m1yzqwnrvox25fhjxuiezbyfbuw3sy6ywelqalk6b5fwpfpdazuj6a
{
  ALTER TYPE sys_core::SysEligibilityNode {
      CREATE PROPERTY nodeIdDependent: default::nonNegative;
  };
  ALTER TYPE sys_core::SysEligibilityNode {
      DROP PROPERTY nodesDependent;
  };
};
