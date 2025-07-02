CREATE MIGRATION m1vuebe37z5465z72nd6f5pytzcyvl6hbwlv3co6fzpjr62pipqs7q
    ONTO m17etqonttuzajkjtqcklzub5hzw7n32hopqggoh7bgpg7bp55niha
{
  ALTER TYPE sys_core::SysNodeObjConfig {
      DROP CONSTRAINT std::exclusive ON ((.codeAttrType, .nodeObj));
  };
};
