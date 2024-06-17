CREATE MIGRATION m1jirdcfi3tselj54msofis5c6oxppuvumgppm4vh46szlrkavvotq
    ONTO m1de5mppph3y4dxtlljegfrw2j74ornueifm7j4gb3sgtomwo7l67a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEmbedSelect: sys_core::SysDataObjFieldEmbedListSelect;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListEmbedSelectExpr;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectExpr {
      DROP PROPERTY exprSelect;
  };
};
