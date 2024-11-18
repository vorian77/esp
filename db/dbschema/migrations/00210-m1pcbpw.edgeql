CREATE MIGRATION m1pcbpwjm2ebryfyztsxncvwscsjttatvlhlpw5dcddqeiq4u7povq
    ONTO m1ymrqoe53t2sayocz7ndnjtw4464ohkexncl3smo43ffvokvjvlfa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY items {
          SET TYPE std::json USING (<std::json>.items);
      };
  };
};
