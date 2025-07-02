CREATE MIGRATION m15csxjyjfjum4eakjx52ebb63rauitteenuyfrmupscegcam3c32q
    ONTO m1cvcpstmq6kpfh67erhfww2utjcie3e4zwdddb4qdn3elbphniv7q
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK ownerOld {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK ownerOld {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
  };
};
