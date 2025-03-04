CREATE MIGRATION m12ed3minsaxcufro4pmdctn5tznaw2wpcihyvrsps2new3pwf3j2a
    ONTO m1ziepszrkru74zumcysc7yl2by5xkkemzl5ookslom72llyh75xoq
{
  DROP FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str);
  CREATE FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str, attrOwnerName: std::str, attrName: std::str, attrHasAccess: std::bool) ->  std::str USING (WITH
      obj := 
          sys_core::getObj(objOwnerName, objName)
  SELECT
      objOwnerName
  );
};
