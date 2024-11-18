CREATE MIGRATION m1dlghb7qp4jptu6ydwxsrnvn443mdy2vspxf32pfwkxapp7hv7rka
    ONTO m1jirdcfi3tselj54msofis5c6oxppuvumgppm4vh46szlrkavvotq
{
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelect USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelect
  FILTER
      (.name = name)
  );
  DROP FUNCTION sys_core::getDataObjFieldEmbedListSelectExpr(name: std::str);
  DROP TYPE sys_core::SysDataObjFieldEmbedListSelectExpr;
};
