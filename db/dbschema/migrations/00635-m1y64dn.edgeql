CREATE MIGRATION m1y64dns26mw736sccoo6jnxtjeyalzjhmtqfrz7y42ubvjgotm3yq
    ONTO m1rikizasiunutyihj2puxhkzfvwqq6dzkebhs7uljnb7avq7zg57a
{
  ALTER TYPE app_cm::CmClient {
      CREATE LINK owner: sys_core::ObjRoot;
  };
};
