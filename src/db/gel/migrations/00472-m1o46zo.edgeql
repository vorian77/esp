CREATE MIGRATION m1o46zout6ejdorrnfnkanonmkrlor2x3q2cskd5ycisumi5klwdkq
    ONTO m1gbjawnxdghaeqwfrc6ebkxhdmc36xd4w7p7xr7yntzaopt5bacra
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isExcludeDisplay {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isExcludeInsert {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isExcludeSelect {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isExcludeUpdate {
          SET REQUIRED USING (<std::bool>{});
      };
  };
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY isExcludeDisplay {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
