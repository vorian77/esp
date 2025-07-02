CREATE MIGRATION m1jrfu7vlsvcdtreqvzbpoiq3kmqb7n67akx7zlwe6ngaeaaprzjzq
    ONTO m1eeqltcpxx723eo5dyepskamre5xf4ucd5ei4ht332v2fa2okicda
{
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK users {
          USING (.<owner[IS sys_user::SysUser]);
      };
  };
  ALTER TYPE sys_user::SysUser {
      DROP LINK org;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK ownerNew;
  };
};
