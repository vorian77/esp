CREATE MIGRATION m1v4rzalpaf3s2gwdpd3725xlmsulhoaahmeimwwzhq4qqmda56fdq
    ONTO m1visataczdbcwpv3agfmbwcv74qinyx33zkiiwxkpeqcs5u6vutsa
{
              ALTER TYPE sys_user::SysUserType {
      ALTER LINK resourcea_sys_footer {
          SET TYPE sys_core::SysNodeObj USING (.resourcea_sys_footer[IS sys_core::SysNodeObj]);
      };
      ALTER LINK resourcea_sys_widget {
          SET TYPE sys_user::SysWidget USING (.resourcea_sys_widget[IS sys_user::SysWidget]);
      };
      ALTER LINK resources_sys_app {
          SET TYPE sys_core::SysApp USING (.resources_sys_app[IS sys_core::SysApp]);
      };
  };
};
