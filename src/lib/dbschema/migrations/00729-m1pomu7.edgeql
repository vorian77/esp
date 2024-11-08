CREATE MIGRATION m1pomu7knmel6zgr4zbedaoc3uwg2ux7k7fmhzigpq2knsmwmvodqq
    ONTO m1qau6v6gpi2cpgw6mz427gzj773tljp7rq3goo53eqt6oz3xj4uba
{
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources_sys_app;
      DROP LINK resources_sys_footer;
  };
};
