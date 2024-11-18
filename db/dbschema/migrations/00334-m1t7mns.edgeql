CREATE MIGRATION m1t7mnsiszzxs4b6ctt3sdifbgwbttfmh4zppmxsg5lc2blw45efza
    ONTO m14yy6456yh47rju3sz266z5nmx5oa4j6kuiqlru5srwg63eghm3lq
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE REQUIRED PROPERTY isDisplay: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
      CREATE REQUIRED PROPERTY isDisplayable: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER PROPERTY isShow {
          RENAME TO isDisplay;
      };
  };
};
