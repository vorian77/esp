CREATE MIGRATION m1mswvrcy44px3gnpd5dg5uv7rg7jlosumrno3afpf4iknawpjbbxa
    ONTO m1ljegcawx7ltnzldrokmbyxfuv34mzuatungg4576zm6cw75rqdyq
{
              ALTER TYPE app_cm::CmCourse {
      ALTER LINK cohorts {
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_db::SysTable {
      CREATE PROPERTY table := (((.mod ++ '::') ++ .name));
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resources {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
      DROP LINK resources_sys_app;
      DROP LINK resources_sys_footer;
  };
};
