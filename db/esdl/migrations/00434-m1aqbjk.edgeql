CREATE MIGRATION m1aqbjkatsltkipuws5je7hi2rz7yj2sldt3r2fq4kuypf7hgb63hq
    ONTO m1se72xlg2mknqxui3qtsf37mswytltw4ekepcyvzb2guvxqeji5da
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isSelect: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY orderSelect;
  };
};
