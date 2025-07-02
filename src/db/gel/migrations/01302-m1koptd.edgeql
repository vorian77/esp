CREATE MIGRATION m1koptdrq44l5m4cetwqs47h6rkgbvadzl4nd4es7l4nxz2423ny5q
    ONTO m1pw6whpgipy4clhrk3sdimzvazttc4kb5yhcdp2s55qag3psxuwia
{
  ALTER TYPE sys_user::SysUser {
      CREATE LINK owner: sys_core::SysOrg {
          SET REQUIRED USING (<sys_core::SysOrg>{.ownerOld});
      };
      DROP EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt;
      EXTENDING sys_core::SysObjOrg LAST;
  };
  ALTER TYPE sys_user::SysUser {
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
