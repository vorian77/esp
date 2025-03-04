CREATE MIGRATION m1y2gh5uxcpujg7px3ibliskdvhkxob2rgpbsn4akixfbjix2h2yoq
    ONTO m1vs4gj5ydublwwdlpwmvc22d3nrglkf3eennunqmsjgxz5ffp2dua
{
      CREATE TYPE app_cm::CmPartner EXTENDING sys_core::SysObjEnt {
      CREATE PROPERTY idMigration: std::uuid;
  };
};
