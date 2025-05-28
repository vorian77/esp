CREATE MIGRATION m1cajaaezniyie65d7nivxi7udwsjv7ci2u4qdms626o7yvvenyujq
    ONTO m1yj7j22y754ugx44pflfzpariamzhs5xyb6ltzunoakptpifzm7vq
{
  ALTER TYPE sys_core::SysObjAttrExpr {
      ALTER PROPERTY exprAllow {
          RENAME TO exprObjects;
      };
  };
  ALTER TYPE sys_core::SysObjAttrExpr {
      DROP PROPERTY exprObjs;
  };
};
