CREATE MIGRATION m1bfkd2bjmygetnh3r7i2ulaqekdr327bkydzfv3nev4hmodibz6ya
    ONTO m1vcis6jzcmwem62hrkg76eyl5hntvaqwrxkamxalaylgimgmv5xpq
{
  CREATE FUNCTION sys_core::getDataObjFieldEmbedDetail(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldEmbedDetail USING (SELECT
      sys_core::SysDataObjFieldEmbedDetail
  FILTER
      (.name = name)
  );
};
