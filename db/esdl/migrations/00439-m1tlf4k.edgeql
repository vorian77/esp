CREATE MIGRATION m1tlf4keyx4bfravcqvnj5c2d3gktxdfeo5ws7y62bcunqu47kkdja
    ONTO m1grh2oxusadkxafnavdjwkfhsbag3jfm6bbnmrzfmjcocybbgvpuq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isDisplay;
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      DROP PROPERTY isDisplay;
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      CREATE REQUIRED PROPERTY ordersDisplay: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
