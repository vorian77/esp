CREATE MIGRATION m1lng7jcddiwii2nc5aqdocrkjqytl2fu2txzfd5f7xuhmbke7vaua
    ONTO m1vvbzcgjdivh2rhjeptunnwukwkejklpae5c6jjukfphq6zt2uc7q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isExcludeInsert: std::bool;
      CREATE PROPERTY isExcludeSelect: std::bool;
      CREATE PROPERTY isExcludeUpdate: std::bool;
  };
};
