CREATE MIGRATION m1ar24wfotwl6dtbyp7pvobmepodzb3yckowxi2sltdtuaibqnvhva
    ONTO m1up5jokvn4ref4tzobx7zmadwailw3hm2yhxnanz67iamlgrdzkpq
{
  CREATE TYPE sys_core::SysApp EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK appHeader: sys_core::SysAppHeader;
      CREATE MULTI LINK nodes: sys_core::SysNodeObj {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getApp(name: std::str) -> OPTIONAL sys_core::SysApp USING (SELECT
      std::assert_single((SELECT
          sys_core::SysApp
      FILTER
          (.name = name)
      ))
  );
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK resources_sys_app: sys_core::SysApp;
  };
};
