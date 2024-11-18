CREATE MIGRATION m1ok3kidp44piik26w4jlonxx4mvot5olv5rfc4ths33wvsytkhg2a
    ONTO m1pcbpwjm2ebryfyztsxncvwscsjttatvlhlpw5dcddqeiq4u7povq
{
                  ALTER TYPE sys_core::SysApp {
      CREATE PROPERTY test: std::json;
  };
};
