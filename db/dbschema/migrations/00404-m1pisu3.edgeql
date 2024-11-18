CREATE MIGRATION m1pisu37qq23eewcwxbiafelezqrmk6gxelxeiy4aoooqb4qbxtqzq
    ONTO m1uflvotutpgschbrcegobnhyvmbhtzhu4b4rm2hz7vql6hpbaockq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY parentExprFilter: std::str;
  };
};
