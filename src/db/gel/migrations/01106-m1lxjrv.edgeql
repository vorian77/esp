CREATE MIGRATION m1lxjrvrcvklzxij6jxi7uqqn5ajm3bn3hjhfmxapti2h67pzkch6a
    ONTO m14p2jhtsc5nx6quyq6lf2rsilxcmcv3q2m6ecn7y64jkitbmvzeaq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK tablesOld;
      DROP PROPERTY exprFilterOld;
      DROP PROPERTY exprSortOld;
      DROP PROPERTY exprWithOld;
      DROP PROPERTY testPropOld;
  };
};
