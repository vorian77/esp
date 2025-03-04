CREATE MIGRATION m1visataczdbcwpv3agfmbwcv74qinyx33zkiiwxkpeqcs5u6vutsa
    ONTO m1ir2mdqj2b52jgusmnvt2qeaoow3fy7wenfxgw2hsmoq7yogoqrpq
{
              ALTER TYPE sys_user::SysUserType {
      ALTER LINK resource_subjects {
          RENAME TO resources_subject;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resource_sys_apps {
          RENAME TO resourcea_sys_footer;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resource_sys_footers {
          RENAME TO resourcea_sys_widget;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resource_sys_widgets {
          RENAME TO resources_sys_app;
      };
  };
};
