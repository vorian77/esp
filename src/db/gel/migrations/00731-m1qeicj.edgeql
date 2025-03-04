CREATE MIGRATION m1qeicjd3ru6nlyq26inzvcq5hzejjf5urtbqpj7wbzzhbtc6kdila
    ONTO m13lro7dc33w7ja7dm6kouqo7oisd3uu3yje4k2zefmdeuabeubkkq
{
              ALTER TYPE app_cm::CmCohort {
      DROP LINK staffAdmin;
      DROP LINK staffAgency;
      ALTER LINK staffInstructor {
          SET TYPE sys_user::SysUser USING (.staffInstructor[IS sys_user::SysUser]);
      };
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK staffAdmin;
      DROP LINK staffAgency;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP LINK staffAgency;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP LINK staffAgency;
  };
  ALTER TYPE app_cm::CmCsfMsg {
      ALTER LINK sender {
          SET TYPE sys_user::SysUser USING (.sender[IS sys_user::SysUser]);
      };
  };
  ALTER TYPE sys_rep::SysRepUserAnalytic {
      ALTER LINK analytic {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE sys_user::SysStaff {
      ALTER LINK person {
          RESET ON SOURCE DELETE;
      };
  };
};
