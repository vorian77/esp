CREATE MIGRATION m1a333gc2ompsqsvqshjufvqkt7t2pxpamrnfbbonagsle2nsqa6sq
    ONTO m1xctfl4lroolra4druyqsut727sojbxsspatmfxf662kwmdc5f2xa
{
  CREATE FUNCTION sys_user::getRootUser() -> OPTIONAL sys_user::SysUser USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.userName = '*ROOTUSER*')
      ))
  );
  CREATE FUNCTION sys_user::getUserByName(userName: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      sys_user::SysUser
  FILTER
      (.userName = userName)
  );
  CREATE GLOBAL sys_user::SYS_USER := (SELECT
      sys_user::SysUser
  FILTER
      (.userName = 'sys_user')
  );
  CREATE GLOBAL sys_user::SYS_USER_ID := (SELECT
      sys_user::SysUser {
          id
      }
  FILTER
      (.userName = 'sys_user')
  );
};
