CREATE MIGRATION m1vozbkt55w4ui3b2rl7pvaoonohwllbe2zvvlritxh2egr3br4fba
    ONTO m17e3rugloa5xn2qmu5phb6tpb5xxgwizkircyya4atme42cssrtoa
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListEmbed;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEmbedConfig: sys_core::SysDataObjFieldEmbedListConfig;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEmbedSelectExpr: sys_core::SysDataObjFieldEmbedListSelectExpr;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEmbedSelectUser: sys_core::SysDataObjFieldEmbedListSelectUser;
  };
};
