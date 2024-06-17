CREATE MIGRATION m1b73s27bgqwdqlrjimex7nnb44ah4gnsm6fskighttvsrp6ms2csq
    ONTO m1nkijore76ucpr2agzvxttqnq4fjpgx2eqtljoumyybvc3kik3piq
{
  ALTER TYPE sys_migr::SysMigr {
      ALTER LINK tablesSource {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK tablesTarget {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_migr::SysMigrSourceTable {
      ALTER LINK columns {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      ALTER LINK columns {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
