CREATE MIGRATION m1vgmdxegh72ief6w3z6plkiuxyq263kv5fzkrp5li5icwvmlzbnma
    ONTO m1fi3bql3agpwuap72kta2o5b6uiejsdgmlxxz7ngnak4o7tmpztva
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK queryRider: sys_core::SysDataObjQueryRider {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
