CREATE MIGRATION m1h7hw657ldxzxrdnodqnxgg5ke7deazxx5bhpz52tsfibxha6zcjq
    ONTO m1vqxbppbuxn7su4cj5ilu76ye2maojn637p632abm574qbxe532zq
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK owner {
          RENAME TO ownerSys;
      };
  };
};
