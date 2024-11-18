CREATE MIGRATION m1ld4xuedyu7gustysrtfnlikivippuxup45eunluv5ce7zvexo4va
    ONTO m1bsrs5vkyfpeqqvjokdiddpmbb7gftiayudexjz4xca5mnt5cyfuq
{
  CREATE MODULE sys_migr IF NOT EXISTS;
  CREATE TYPE sys_migr::SysMigrSourceColumn {
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE sys_migr::SysMigrSourceTable {
      CREATE MULTI LINK columns: sys_migr::SysMigrSourceColumn;
      CREATE REQUIRED LINK codeMigrSourceType: sys_core::SysCode;
      CREATE PROPERTY exprSelect: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE sys_migr::SysMigrTargetColumn {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE TYPE sys_migr::SysMigrTargetTable {
      CREATE MULTI LINK columns: sys_migr::SysMigrTargetColumn;
      CREATE REQUIRED LINK table: sys_db::SysTable;
  };
  CREATE TYPE sys_migr::SysMigr EXTENDING sys_core::SysObj {
      CREATE MULTI LINK tablesSource: sys_migr::SysMigrSourceTable;
      CREATE MULTI LINK tablesTarget: sys_migr::SysMigrTargetTable;
  };
  DROP TYPE sys_user::SysUserTest;
};
