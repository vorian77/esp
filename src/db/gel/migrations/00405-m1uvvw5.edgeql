CREATE MIGRATION m1uvvw5blxgi7lecebtsmknx23ec4kz6r3af44jmhmg3faobd6bq3q
    ONTO m1pisu37qq23eewcwxbiafelezqrmk6gxelxeiy4aoooqb4qbxtqzq
{
                  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY parentExprFilter {
          RENAME TO parentFilterExpr;
      };
  };
};
