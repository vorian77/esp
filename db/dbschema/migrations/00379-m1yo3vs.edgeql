CREATE MIGRATION m1yo3vsdhlbs4l3pao2hfiaeglatd5b5wgx32xxkzk3duatju4emxa
    ONTO m1nm45s7mkcdh7dpymqud4crapvmptpnyusrutife7rc7qtwf746bq
{
  ALTER TYPE sys_rep::SysRepParm {
      DROP LINK codeType;
  };
  ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
  };
  ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK linkTable: sys_db::SysTable;
  };
  ALTER TYPE sys_rep::SysRepParm {
      CREATE PROPERTY fieldListItemsParmName: std::str;
  };
};
