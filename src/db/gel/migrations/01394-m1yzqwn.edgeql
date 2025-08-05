CREATE MIGRATION m1yzqwnrvox25fhjxuiezbyfbuw3sy6ywelqalk6b5fwpfpdazuj6a
    ONTO m1nf7h3rniqvupl5tovwecfzligpbxkpl3xdy6yz666cgcf2kqtpkq
{
  ALTER TYPE sys_core::SysEligibilityNode {
      CREATE MULTI PROPERTY nodesDependent: default::nonNegative;
  };
};
