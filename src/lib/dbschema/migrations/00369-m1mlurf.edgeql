CREATE MIGRATION m1mlurfyq7f5mfz3czcwjfz6begsi5zz54l22pd5zlvjzjoditvnvq
    ONTO m1uos32wgmuoczsrwkqpedmj4ogkvtb6xhfx6xzjhctrstqijifjbq
{
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelectUser(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelectUser USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelectUser
  FILTER
      (.name = name)
  );
};
