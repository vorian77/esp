CREATE MIGRATION m1a2uhaivb5ifilt5rjsvl4zeehczcf72yvcocrwmzggwchxz3sxvq
    ONTO m1npflxhqlvx6mnwp4yttpqei43hvu4lbhla6kz56wjqbkkpzq6tla
{
  DROP FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str);
  DROP FUNCTION sys_core::getCodeType(codeTypeName: std::str);
  DROP FUNCTION sys_core::getDataObj(dataObjName: std::str);
  DROP FUNCTION sys_core::getDataObjActionField(dataObjActionName: std::str);
  DROP FUNCTION sys_core::getDataObjActionFieldGroup(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldEmbedListEdit(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldListItems(name: std::str);
  DROP FUNCTION sys_core::getNodeObjById(nodeObjId: std::str);
  DROP FUNCTION sys_core::getNodeObjByName(nodeObjName: std::str);
  DROP FUNCTION sys_core::getObjRoot(name: std::str);
  DROP FUNCTION sys_core::getOrg(name: std::str);
  DROP FUNCTION sys_core::getSystem(nameOwner: std::str, nameSystem: std::str);
  DROP FUNCTION sys_core::getSystemPrime(nameSystem: std::str);
  DROP FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str);
  ALTER TYPE sys_core::SysObj {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_core::SysObj {
      DROP LINK owner;
  };
  ALTER TYPE sys_core::SysObj {
      CREATE LINK ownerOld: sys_core::ObjRoot;
  };
};
