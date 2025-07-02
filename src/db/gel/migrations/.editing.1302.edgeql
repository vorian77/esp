CREATE MIGRATION m1hs2qusvzjoco66lx3inlkxh4kon2o74mt275zeayctverj237ega
    ONTO m1pw6whpgipy4clhrk3sdimzvazttc4kb5yhcdp2s55qag3psxuwia
{
  ALTER TYPE sys_user::SysUser {
      CREATE LINK owner: sys_core::SysOrg {
          SET REQUIRED USING (<sys_core::SysOrg>{});
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
