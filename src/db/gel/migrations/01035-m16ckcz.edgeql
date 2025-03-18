CREATE MIGRATION m16ckczamchm77hbegcbkla2mkaagmerohyswxh6pe6uxl4jeb4x7q
    ONTO m1edjodfnesxhuakiwufsrrixefksj7g5zinfaks2scuy4apgbxobq
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      DROP LINK codeValueTarget;
      DROP LINK codeValueTrigger;
      DROP LINK codeValueTypeTrigger;
      DROP PROPERTY selectParmValue;
      DROP PROPERTY valueScalarTarget;
      DROP PROPERTY valueScalarTrigger;
  };
};
