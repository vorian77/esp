CREATE MIGRATION m17zj6p6u7js2kpefaow4wdcmmx5r4d7wwpg37yxtlnwnwq3hugxoq
    ONTO m1ju5nuva4c5nm3gtvkysdtlar76qvbazlvd7t74vriuktmx6v5y6q
{
              CREATE FUNCTION sys_core::getCodeType(codeTypeName: std::str) -> OPTIONAL sys_core::SysCodeType USING (SELECT
      sys_core::SysCodeType
  FILTER
      (.name = codeTypeName)
  );
  CREATE FUNCTION sys_core::getDataObj(dataObjName: std::str) -> OPTIONAL sys_core::SysDataObj USING (SELECT
      sys_core::SysDataObj
  FILTER
      (.name = dataObjName)
  );
  CREATE FUNCTION sys_core::getDataObjActionField(dataObjActionName: std::str) -> OPTIONAL sys_core::SysDataObjActionField USING (SELECT
      sys_core::SysDataObjActionField
  FILTER
      (.name = dataObjActionName)
  );
  CREATE FUNCTION sys_core::getDataObjActionFieldGroup(name: std::str) -> OPTIONAL sys_core::SysDataObjActionFieldGroup USING (SELECT
      sys_core::SysDataObjActionFieldGroup
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListConfig USING (SELECT
      sys_core::SysDataObjFieldEmbedListConfig
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListEdit(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListEdit USING (SELECT
      sys_core::SysDataObjFieldEmbedListEdit
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelect USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelect
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getDataObjFieldListItems(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListItems USING (SELECT
      sys_core::SysDataObjFieldListItems
  FILTER
      (.name = name)
  );
  CREATE FUNCTION sys_core::getNodeObjById(nodeObjId: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.id = <std::uuid>nodeObjId)
  );
  CREATE FUNCTION sys_core::getNodeObjByName(nodeObjName: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.name = nodeObjName)
  );
  CREATE FUNCTION sys_core::getObjRoot(name: std::str) -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_core::getOrg(name: std::str) -> OPTIONAL sys_core::SysOrg USING (SELECT
      std::assert_single((SELECT
          sys_core::SysOrg
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_core::getSystem(nameOwner: std::str, nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = nameOwner) AND (.name = nameOwner))
      ))
  );
  CREATE FUNCTION sys_core::getSystemPrime(nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          (.name = nameSystem)
      ))
  );
  CREATE FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str) -> OPTIONAL std::bool USING (SELECT
      (std::count(schema::ObjectType FILTER
          ((.name = objName) AND (.links.name = linkName))
      ) > 0)
  );
};
