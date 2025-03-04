CREATE MIGRATION m1ka7eoelc3ppvoymxrcu6l3ooppjz53eq62phiu44l4mfz7hugaqa
    ONTO m1vgmdxegh72ief6w3z6plkiuxyq263kv5fzkrp5li5icwvmlzbnma
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK queryRider;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK queryRiders: sys_core::SysDataObjQueryRider {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
