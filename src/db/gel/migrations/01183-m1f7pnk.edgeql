CREATE MIGRATION m1f7pnk5nvnve3tk5y7fln2fipzmwj3bostz5nzbloirh6b6f63u7a
    ONTO m1jq3r2ga26bylei4aeuwps6qfvpzdl3pul57de4ln4kdavwopnqpq
{
  ALTER FUNCTION sys_user::getRootUser() USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.name = '*ROOTUSER*')
      ))
  );
  DROP FUNCTION sys_user::getUserByName(userName: std::str);
  CREATE FUNCTION sys_user::getUserByName(name: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.name = name)
      ))
  );
  ALTER TYPE sys_user::SysUser {
      DROP CONSTRAINT std::exclusive ON (.userName);
  };
  ALTER TYPE sys_user::SysUser {
      DROP LINK owner1;
  };
};
