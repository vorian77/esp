CREATE MIGRATION m1ir2mdqj2b52jgusmnvt2qeaoow3fy7wenfxgw2hsmoq7yogoqrpq
    ONTO m1ocdaso2znfs25vqmpeweir53dpsbnknyjyrycdeu656jgjxiurwa
{
              ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK resource_subjects: sys_user::SysUserTypeResource {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK resource_sys_apps: sys_core::ObjRoot;
      CREATE MULTI LINK resource_sys_footers: sys_core::ObjRoot;
      CREATE MULTI LINK resource_sys_widgets: sys_core::ObjRoot;
  };
};
