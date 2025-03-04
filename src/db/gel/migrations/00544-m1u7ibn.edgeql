CREATE MIGRATION m1u7ibnl5cvnig25fzalrum7y7rrx7cqxynrx4mvvwkypu6y7xsv5a
    ONTO m1tzq5a25xttvycazxwf2tcgxyn7i3toq2lkbpaljojp62caogu4vq
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE LINK listRowDisplayColumn: sys_db::SysColumn;
  };
};
