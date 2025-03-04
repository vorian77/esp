CREATE MIGRATION m1tpu4zhacczhwau5oi373y7wmiymk3zrwoogau52qpzl2wdpgyflq
    ONTO m1t7gb6t6fjzl3uqizyjdihotpz445clrpaqnxk3s7kbjcb5mb6yda
{
  ALTER TYPE sys_core::ObjRootCore {
      CREATE PROPERTY headerNew: std::str;
      CREATE PROPERTY nameNew: std::str;
  };
};
