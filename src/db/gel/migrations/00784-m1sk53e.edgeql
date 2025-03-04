CREATE MIGRATION m1sk53eoi3jfdnfeqrhi47nd7odqxepfk5fedfmdjho2277uvlaqoa
    ONTO m1fx2etukzqlm52ny5eyt3rfbnqe4qoroudm2cercamkljg5yhcwxq
{
          CREATE TYPE sys_core::SysDataObjFieldListItems EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK codeDataTypeDisplay: sys_core::SysCode;
      CREATE LINK codeMask: sys_core::SysCode;
      CREATE MULTI LINK props: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK table: sys_db::SysTable;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprPropDisplay: std::str;
      CREATE PROPERTY exprSort: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
  CREATE FUNCTION sys_core::getDataObjFieldListItems(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListItems USING (SELECT
      sys_core::SysDataObjFieldListItems
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
  };
};
