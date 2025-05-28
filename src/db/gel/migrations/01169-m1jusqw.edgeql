CREATE MIGRATION m1jusqwcg4dzzq7o7v2ioc4xu47cwkdgljmp7aicxu74imrgly6cha
    ONTO m1qkuctf3c5tpwpdwtnlurlpg352yann2ozqamqsfln67cbs43cwlq
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY createdAt {
          SET default := (std::datetime_of_transaction());
      };
  };
};
