CREATE MIGRATION m1jen3kj5lamdsdrstt26j55ad7wumhqqoyxdynowvq6ruc4y6fpla
    ONTO m1urr6qehqkubwhou5z2iwvpxv3sl6foajlkil3kk7ntuefutanria
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK queryRidersOld;
  };
};
