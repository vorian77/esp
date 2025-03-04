CREATE MIGRATION m1jrr4yfiwmtx3gcsmenrbmtmuisr5clyeji634yhwtnvqt5hdmp7a
    ONTO m1n2gky6ruvi46n6y6d7u7brt2fevgfsoicq7xmnovu5fkzjoqfvba
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          SET TYPE default::SysPerson USING (.person[IS default::SysPerson]);
      };
  };
  ALTER TYPE sys_user::SysUser {
      ALTER LINK person {
          SET TYPE default::SysPerson USING (.person[IS default::SysPerson]);
      };
  };
};
