CREATE MIGRATION m1s6umx5u7pr7k2obhrgoevyysbpw2xliqrpmgp3vhveekddg7uawa
    ONTO m1wkm5wit7dwif7nmjn5xpofvc72hzxrp33aevusumbexo6hoifvda
{
                              ALTER TYPE sys_core::SysDataObjActionField {
      DROP PROPERTY order;
  };
};
