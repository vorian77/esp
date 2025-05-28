CREATE MIGRATION m1jd7lc6i354jga2p4j2v4ytsduceqc5sco2633xrm5gp4gfguhe5a
    ONTO m1cajaaezniyie65d7nivxi7udwsjv7ci2u4qdms626o7yvvenyujq
{
  ALTER TYPE sys_core::SysObjAttrExpr {
      ALTER PROPERTY exprObjects {
          RENAME TO expr;
      };
  };
};
