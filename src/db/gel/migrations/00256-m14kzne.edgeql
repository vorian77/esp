CREATE MIGRATION m14kzned6g46kabjaaontusiic4mbpaqi3bz2brb4kgaxnxvgguaba
    ONTO m144lcz3y3pvfwntbb532jpoo3ckscuux4n26utvhhgfa2lqmxavgq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isLinkProperty;
  };
};
