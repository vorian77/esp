CREATE MIGRATION m14ijxnumeoidfb7qurz6o5a3ykbeb4wgs6cf5hg3gwdywmvid5poa
    ONTO m1soin4rbkclzmb5ijxhj5wck6z56pde2z3hgosov5mmcuy6m7hy3a
{
  ALTER TYPE sys_core::SysOrg {
      CREATE LINK users := (.<ownerOrg[IS sys_user::SysUser]);
  };
};
