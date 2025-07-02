CREATE MIGRATION m1vqnjnygqmqs2s67xbk5onf3paeqw3gbkcljw4ua3cdlyzvr5w2rq
    ONTO m1koptdrq44l5m4cetwqs47h6rkgbvadzl4nd4es7l4nxz2423ny5q
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK owner: sys_core::SysOrg {
          SET REQUIRED USING (<sys_core::SysOrg>{.ownerOld});
      };
      DROP EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt;
      EXTENDING sys_core::SysObjOrg LAST;
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
