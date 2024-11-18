CREATE MIGRATION m1jrh66wv77lwxbe2df7s6g4aersfex27vidoqq7lzsrncilo6r3pa
    ONTO m1zht2yx5hek4es5wuv7uynfuura7l77h4lfr5lvf4cb3j6zsw6q7q
{
  CREATE TYPE sys_core::SysDataObjFieldEmbedListConfig EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjEmbed: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjModal: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListConfig(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListConfig USING (SELECT
      sys_core::SysDataObjFieldEmbedListConfig
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_core::SysDataObjFieldEmbedListEdit EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjList: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListEdit(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListEdit USING (SELECT
      sys_core::SysDataObjFieldEmbedListEdit
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_core::SysDataObjFieldEmbedListSelect EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjList: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY btnLabelComplete: std::str;
  };
  CREATE FUNCTION sys_core::getDataObjFieldEmbedListSelect(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedListSelect USING (SELECT
      sys_core::SysDataObjFieldEmbedListSelect
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldEmbedListConfig: sys_core::SysDataObjFieldEmbedListConfig;
      CREATE LINK fieldEmbedListEdit: sys_core::SysDataObjFieldEmbedListEdit;
      CREATE LINK fieldEmbedListSelect: sys_core::SysDataObjFieldEmbedListSelect;
  };
};
