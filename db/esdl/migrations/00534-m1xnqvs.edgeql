CREATE MIGRATION m1xnqvsqq5w5dibovacyvn2nyxieasav6fdp4w4anzjvappsxd5guq
    ONTO m1gkmbkqfspeggjxm6e76kn6yqp3kgjcof37q46oylwb3mk4eiyucq
{
  ALTER FUNCTION sys_user::getUser(userName: std::str) {
      RENAME TO sys_user::getUserByName;
  };
  CREATE FUNCTION sys_user::getUserById(userId: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      sys_user::SysUser
  FILTER
      (.id = <std::uuid>userId)
  );
};
