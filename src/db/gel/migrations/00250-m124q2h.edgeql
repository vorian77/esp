CREATE MIGRATION m124q2hdurxsgceepesctr2dec6icr4h4sarxyiy74j3ukvoduhnea
    ONTO m1irwqxelizdduoe6j7rrrzfgkxo7buxsplekxidh235uja2dy4jpq
{
                              ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY listOrderField {
          RENAME TO listOrderColumn;
      };
  };
};
