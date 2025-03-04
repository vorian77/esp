CREATE MIGRATION m1xvvprdbgjbzxbysg6ck75yk3thnaxrv3tbxuf2oiwfghsvva5fva
    ONTO m1asp6vt42o2g6tyuucv4rfhkzkwpnimffqbrz64j2eumwig2wkrxq
{
                              ALTER TYPE sys_db::SysColumn {
      DROP PROPERTY isSetBySys;
  };
};
