CREATE MIGRATION m1gbjawnxdghaeqwfrc6ebkxhdmc36xd4w7p7xr7yntzaopt5bacra
    ONTO m1lhy6kbbd6b4kzzywfellmwafseebcsjdv7ypxnbltgpez7thpfva
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY isExcludeDisplay: std::bool;
  };
};
