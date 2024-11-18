CREATE MIGRATION m1zht2yx5hek4es5wuv7uynfuura7l77h4lfr5lvf4cb3j6zsw6q7q
    ONTO m1s7inxgngej646itg6av4r5f55y5ee4bp7qv4dcrbbfmwyxtmxvaa
{
  DROP FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldEmbedListSelectUser(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListEmbedConfig;
      DROP LINK fieldListEmbedSelect;
      DROP LINK fieldListEmbedSelectUser;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedList {
      DROP CONSTRAINT std::exclusive ON (.name);
  };
  DROP TYPE sys_core::SysDataObjFieldEmbedListConfig;
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      DROP LINK dataObjList;
  };
  DROP TYPE sys_core::SysDataObjFieldEmbedListSelectUser;
  DROP TYPE sys_core::SysDataObjFieldEmbedListSelect;
  DROP TYPE sys_core::SysDataObjFieldEmbedList;
};
