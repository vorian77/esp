CREATE MIGRATION m17bxzqkt7bqrazjtl7pxmlizhejkccywjyb5l3ia4zs2bq2jjl3ea
    ONTO m1ml2zdgyranvjoim7eoxhg5bcdzs7misbtfo4ggn772h2okip4aza
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY propNameKeyPrefix: std::str;
      CREATE PROPERTY propNameKeySuffix: std::str;
  };
};
