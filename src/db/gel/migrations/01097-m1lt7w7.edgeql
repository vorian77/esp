CREATE MIGRATION m1lt7w7irbxry7jguhyj7up67vidtxs5qtzjjiqdjf6vnrwmgkvv7q
    ONTO m16cg5cqumucneq5sdhxdmbddfplafsiikdd5ry3nad6em4urnosha
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK attrsAccessInsert;
  };
};
