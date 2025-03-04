CREATE MIGRATION m1bl66fvxyaanstm5475653q2bn7x72pyowwucm56glrmkehnuzscq
    ONTO m1u7ibnl5cvnig25fzalrum7y7rrx7cqxynrx4mvvwkypu6y7xsv5a
{
              ALTER TYPE sys_core::SysDataObj {
      DROP LINK listRowDisplayColumn;
  };
};
