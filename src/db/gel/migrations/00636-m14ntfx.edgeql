CREATE MIGRATION m14ntfxpukrnwufvqfm22lsafsoccvktffu5zosjrhqeqavgosrzba
    ONTO m1y64dns26mw736sccoo6jnxtjeyalzjhmtqfrz7y42ubvjgotm3yq
{
              ALTER TYPE app_cm::CmClient {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::ObjRoot>{});
      };
  };
};
