CREATE MIGRATION m1yxvgjbrfqfzhgfegz6rle24m7nyfyjuquj2twqw74f6vgtxankda
    ONTO m1yphq2jrxkgvlhv7d25zezxcv4em5ns6g7it4oclisuqphwpbbowa
{
  ALTER TYPE sys_core::SysObjEnt {
      ALTER LINK contacts {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK notes: sys_core::SysObjNote {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysObjNote {
      DROP LINK owner;
  };
};
