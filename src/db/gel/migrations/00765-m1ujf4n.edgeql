CREATE MIGRATION m1ujf4nk2f6svvjikkvazor33npuezvsw4rdfdrjyh2ps6enkypytq
    ONTO m1nthotnjyt4q62cxriok423gystvmbyb44uh43vju2aurfvo4iraq
{
          ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          SET default := (SELECT
              <std::str>std::uuid_generate_v4()
          );
      };
  };
};
