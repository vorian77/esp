CREATE MIGRATION m1uos32wgmuoczsrwkqpedmj4ogkvtb6xhfx6xzjhctrstqijifjbq
    ONTO m1tkq7u4kcadmgx7vmdptd7ns6x742fcb7pfstrlvsshdsu2r2v4ga
{
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelectExpr(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelectExpr USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelectExpr
  FILTER
      (.name = name)
  );
};
