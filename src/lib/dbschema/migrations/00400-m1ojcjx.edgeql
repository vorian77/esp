CREATE MIGRATION m1ojcjxzdb2socos5wd7zrirlslekgpt6evwipoevpzr2y7nnhkqha
    ONTO m1bqypqwj25vjvbjgr4ja3zawe5fm437x42mnkbhchkslf5xtaqqha
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE PROPERTY exprWith: std::str;
  };
};
