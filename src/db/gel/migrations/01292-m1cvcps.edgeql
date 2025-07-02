CREATE MIGRATION m1cvcpstmq6kpfh67erhfww2utjcie3e4zwdddb4qdn3elbphniv7q
    ONTO m1jrfu7vlsvcdtreqvzbpoiq3kmqb7n67akx7zlwe6ngaeaaprzjzq
{
  ALTER TYPE sys_user::SysUser {
      CREATE LINK ownerOld: sys_core::SysOrg;
  };
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK ownerOld: sys_core::SysOrg;
  };
};
