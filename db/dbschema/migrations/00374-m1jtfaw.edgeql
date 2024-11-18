CREATE MIGRATION m1jtfawgd4w2u5nmdodgposdxrplfke7f2hmytfcwcoaazmyrkfysq
    ONTO m1akunkvrnu3qrlolrr5wkurqgczmqt7xl4qamw27swf7fuuebjgsa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customColCodeType {
          RENAME TO customColType;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customSourceKey {
          RENAME TO customColSourceKey;
      };
  };
};
