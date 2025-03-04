CREATE MIGRATION m13ty7fwdmbt65glsatwi2d6atq24hfl54f2tk2rmwhjppjf5yjwqq
    ONTO m1hzerthramycipkypqnu2n3sjswf7xyj64smcivmpbimg3yapvrva
{
  CREATE MODULE app_crm IF NOT EXISTS;
  CREATE TYPE app_crm::CrmClient EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY email: std::str;
  };
  DROP TYPE default::SysEmailList;
  ALTER TYPE sys_core::SysOrg {
      CREATE LINK users := (.<orgs[IS sys_user::SysUser]);
  };
};
