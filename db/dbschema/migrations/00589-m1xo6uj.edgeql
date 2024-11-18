CREATE MIGRATION m1xo6uj7vbqf4yfvpkm2toidb4f2udaxwhjoyvtyn6vrd27smfjbka
    ONTO m1wyxivzx5ifilvpukocue2oxjfzhs6x6ekxzcemqsrsuwgrlpt65q
{
  DROP FUNCTION sys_user::getRootUser();
  DROP FUNCTION sys_user::getUserByName(userName: std::str);
  DROP GLOBAL sys_user::SYS_USER;
  DROP GLOBAL sys_user::SYS_USER_ID;
  ALTER TYPE sys_user::SysUser {
      ALTER CONSTRAINT std::exclusive ON (.userName) {
          DROP OWNED;
      };
  };
  ALTER TYPE sys_user::UserRoot {
      DROP CONSTRAINT std::exclusive ON (.userName);
  };
  ALTER TYPE sys_user::UserRoot {
      ALTER LINK person {
          RENAME TO personOld;
      };
  };
  ALTER TYPE sys_user::UserRoot {
      ALTER PROPERTY userName {
          RENAME TO userNameOld;
      };
  };
};
