CREATE MIGRATION m1su52mb5dtm7q74mdql7t4xdkhfliyr6icyqxy7ac4umovon4pyra
    ONTO m1wmdn6uc7dh6znnah7nxnscgynj5mmmxnllpoobcyelrwh24sjtra
{
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY name {
          SET OWNED;
      };
  };
  ALTER TYPE sys_core::SysObj {
      ALTER PROPERTY name {
          SET REQUIRED;
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY header {
          SET OWNED;
          SET TYPE std::str;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY name {
          SET TYPE std::str;
      };
  };
};
