CREATE MIGRATION m1vcis6jzcmwem62hrkg76eyl5hntvaqwrxkamxalaylgimgmv5xpq
    ONTO m1j3um55v3rj6774u3iwhoinbshzoa7gnmqkjne6sebet7aypkocua
{
  CREATE TYPE sys_core::SysDataObjFieldEmbedDetail EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK actionFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjDetail: sys_core::SysDataObj {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldEmbedDetail: sys_core::SysDataObjFieldEmbedDetail;
  };
};
