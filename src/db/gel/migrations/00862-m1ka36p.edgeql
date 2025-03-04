CREATE MIGRATION m1ka36pz7i6bhf5wo5x52otycjqtt52bir5kgi4doitiocqa5yj5xq
    ONTO m17btl62iyeamscnworlitxb3n5l46l4ytgpwulkh3a6gfd76wsobq
{
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::SysObjEnt;
      EXTENDING sys_core::SysObj LAST;
  };
};
