CREATE MIGRATION m1bcrpjodag7ha4s6ghhkzaqghuism5wdz2kgjzz24irpbnyh4ugkq
    ONTO m1lng7jcddiwii2nc5aqdocrkjqytl2fu2txzfd5f7xuhmbke7vaua
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isDbAllowNull;
  };
};
