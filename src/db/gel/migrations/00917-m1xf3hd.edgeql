CREATE MIGRATION m1xf3hdpl3oouc2msgl4bofi3wvhcjvwuiecviz3bk2lqwemngfxia
    ONTO m17bnoxp3urwxrbgcapt3ndjz4lz6p2x7royw6ugehd44q2bthu5lq
{
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget {
      CREATE PROPERTY orderDefine: default::nonNegative;
  };
};
