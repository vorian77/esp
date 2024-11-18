CREATE MIGRATION m1up5jokvn4ref4tzobx7zmadwailw3hm2yhxnanz67iamlgrdzkpq
    ONTO m1mhucc2pv7uj7rvbudop2xa6usfchgqf6xuspk5ycs3sfexf5nzsa
{
  DROP FUNCTION sys_core::getApp(name: std::str);
  ALTER TYPE sys_core::SysApp {
      DROP LINK appHeader;
      DROP LINK nodes;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources_sys_app;
  };
  DROP TYPE sys_core::SysApp;
};
