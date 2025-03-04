CREATE MIGRATION m1n544y3hbwkoaq3kbwzpwzofnswswcc5vaepzbocfht2ibfituhza
    ONTO m1k6xllflkd6zjcg7fre56ce2r53ufyoowz627y7n5al3sbcjmm6wa
{
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY mask {
          RENAME TO inputMask;
      };
  };
};
