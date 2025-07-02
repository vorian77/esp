CREATE MIGRATION m1wsn6hturibkm4v4ql4s7ptaphsfprjavlgvxqi56z6jp4zgczv2q
    ONTO m1crkgpiqvi56kdh6x7vg5pqi7rx6ulavhnkncohwufaxaak62csoq
{
  ALTER TYPE sys_core::SysSystem {
      DROP LINK users;
  };
  ALTER TYPE sys_user::SysUser {
      DROP EXTENDING sys_core::SysObjOrg1;
      EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK users;
  };
};
