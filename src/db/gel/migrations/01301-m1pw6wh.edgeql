CREATE MIGRATION m1pw6whpgipy4clhrk3sdimzvazttc4kb5yhcdp2s55qag3psxuwia
    ONTO m1cuuls7xho4l6odqqcnwfnvtlquzdk72j65pqktuttixy2xka4xxq
{
  ALTER TYPE sys_core::SysObjOrg1 {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
