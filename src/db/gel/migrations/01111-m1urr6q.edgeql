CREATE MIGRATION m1urr6qehqkubwhou5z2iwvpxv3sl6foajlkil3kk7ntuefutanria
    ONTO m1nsfqg5qz66fiaxe3zcoymm6pqrpgkie35ubhqffmxgtcp2ns5hiq
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE MULTI LINK queryRiders: sys_core::SysDataObjQueryRider {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
