CREATE MIGRATION m1zjthnfrdkuv6cc2lyb6kxj467o5m2ntpwavdvr2f5sxjrvwkr47a
    ONTO m1cv3pai22bfanqiz4h72z6mrcf3u2ftzp7cenjy3ktaznhvnd7csa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK querySource;
  };
  ALTER TYPE sys_core::SysObjDb {
      CREATE MULTI PROPERTY exprUnions: std::str;
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK querySource;
  };
  DROP TYPE sys_core::SysQuerySource;
};
