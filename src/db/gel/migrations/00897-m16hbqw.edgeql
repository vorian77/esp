CREATE MIGRATION m16hbqwlkywr2ywuxr5lty6ndnvzlziobsqcejivkzquh3nutajx5a
    ONTO m1556dyv4jxtqtq4msbbqzwelxu2vijurf6g5xwt75lqcyvgvahceq
{
  DROP FUNCTION sys_core::getDataObjActionField(dataObjActionName: std::str);
  DROP FUNCTION sys_core::getDataObjActionFieldGroup(name: std::str);
  CREATE FUNCTION sys_core::getDataObjActionGroup(name: std::str) -> OPTIONAL sys_core::SysDataObjActionGroup USING (SELECT
      sys_core::SysDataObjActionGroup
  FILTER
      (.name = name)
  );
};
