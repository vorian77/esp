CREATE MIGRATION m16iab7rm56op22g4nys6lcjhechvjv6jmpv6v6m5d2nfxazimmfoa
    ONTO m1mlucg4ry4ufbxzb72qa6lrsaxp3veters6pvldqhq4kv7p4azddq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY exprSaveAttrObjects {
          RESET CARDINALITY USING (SELECT
              .exprSaveAttrObjects 
          LIMIT
              1
          );
      };
      DROP PROPERTY indexWith;
  };
};
