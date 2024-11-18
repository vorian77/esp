CREATE MIGRATION m1uugguhxuakx4sh4ntm2oqtsxsyvuocg6ura5d47mrkyyjmsfm47q
    ONTO m1s6umx5u7pr7k2obhrgoevyysbpw2xliqrpmgp3vhveekddg7uawa
{
                  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY listSingleRecord: std::bool;
  };
};
