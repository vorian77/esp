CREATE MIGRATION m1pz4djqgnswp6ikaxe62xgp2iguh4gmmt5rsoeaugp5qszm66xbza
    ONTO m1vx5tjjmhl4kstu5s3rfurqjb6472olnpectvg2cdp73pvvpzruiq
{
  CREATE TYPE sys_core::SysAppHeader EXTENDING sys_core::SysObj;
  ALTER TYPE sys_core::SysCode {
      DROP CONSTRAINT std::exclusive ON ((.codeType, .name));
      CREATE PROPERTY headerOld: std::str;
      CREATE PROPERTY nameOld: std::str;
  };
};
