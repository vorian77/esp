CREATE MIGRATION m1of3yjz3nyez3lcn3rav74r5zc53br63rrp47xo7r7fm34dl4l7fa
    ONTO m17jmrirzl4wbc3aqtsvk73icogjbrudgirmaazwr4hsj2ohjas2fa
{
  ALTER TYPE sys_core::SysObjEnt {
      DROP LINK codeStateNew;
      DROP PROPERTY addr1New;
      DROP PROPERTY addr2New;
      DROP PROPERTY cityNew;
      DROP PROPERTY emailNew;
      DROP PROPERTY websiteNew;
      DROP PROPERTY zipNew;
  };
  ALTER TYPE app_cm::CmPartner {
      DROP EXTENDING sys_core::SysObjEnt;
      EXTENDING sys_core::ObjRoot LAST;
  };
  CREATE TYPE sys_core::ObjRootCoreEnt EXTENDING sys_core::ObjRootCore {
      CREATE LINK codeStateNew: sys_core::SysCode;
      CREATE PROPERTY addr1New: std::str;
      CREATE PROPERTY addr2New: std::str;
      CREATE PROPERTY cityNew: std::str;
      CREATE PROPERTY emailNew: std::str;
      CREATE PROPERTY websiteNew: std::str;
      CREATE PROPERTY zipNew: std::str;
  };
  DROP TYPE sys_core::SysObjEnt;
};
