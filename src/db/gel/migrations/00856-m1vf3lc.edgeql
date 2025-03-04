CREATE MIGRATION m1vf3lc5mzf2hd4sxnwkqbynzusoddmyigwzbex562qbsjxxxwf76a
    ONTO m1tpu4zhacczhwau5oi373y7wmiymk3zrwoogau52qpzl2wdpgyflq
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY nameNew {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
