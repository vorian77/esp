CREATE MIGRATION m12jbsrvrhibz6q3ziggeq4qgysiomoqqj3zgzxrfgw4d22l5xif5q
    ONTO m12ed3minsaxcufro4pmdctn5tznaw2wpcihyvrsps2new3pwf3j2a
{
  DROP FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str, attrOwnerName: std::str, attrName: std::str, attrHasAccess: std::bool);
  CREATE FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str, attrOwnerName: std::str, attrName: std::str, attrHasAccess: std::bool) -> OPTIONAL sys_core::SysObj USING (WITH
      obj := 
          sys_core::getObj(objOwnerName, objName)
  SELECT
      obj
  );
};
