CREATE MIGRATION m1qau6v6gpi2cpgw6mz427gzj773tljp7rq3goo53eqt6oz3xj4uba
    ONTO m1hqtrusrlunxtgmnqxhfaztqhyrhdat4suswiwirmfvi6u536cpja
{
  ALTER TYPE app_cm::CmCohort {
      ALTER LINK cohortAttds {
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER LINK cohorts {
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resources {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
  };
};
