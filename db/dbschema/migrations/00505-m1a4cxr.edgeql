CREATE MIGRATION m1a4cxrr2ijl3yuxlv2plpnqf32m4tnzquk5bascm7zmfeumshzrpa
    ONTO m13bhyfzjwult2s6zbccaxnopdua2jbjw6ny2gyfxwkg34ra7votma
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      ALTER PROPERTY btnLabelComplete {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
