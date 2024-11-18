CREATE MIGRATION m1zk2zpiaeh5mgwzh4hy6qujlf7fehapnrypvecfmgeg47rsyhsfva
    ONTO m1xxkj7nzq6kmyqsmoywciw7dbkrikonirhw7yaaxdihz67htym3ea
{
                  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE LINK itemsTable: sys_db::SysTable;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprOrder: std::str;
  };
};
