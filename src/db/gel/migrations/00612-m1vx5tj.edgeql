CREATE MIGRATION m1vx5tjjmhl4kstu5s3rfurqjb6472olnpectvg2cdp73pvvpzruiq
    ONTO m1ln5uppscac73dyxkkzrqa522rb3somabd6dgvo6hsidjctmeuqjq
{
              ALTER TYPE sys_core::SysObj {
      CREATE PROPERTY isGlobalResource: std::bool;
  };
};
