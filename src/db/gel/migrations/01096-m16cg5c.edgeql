CREATE MIGRATION m16cg5cqumucneq5sdhxdmbddfplafsiikdd5ry3nad6em4urnosha
    ONTO m1wgiz7defmmt3axcexfxwaxbf6635pr2bdxq2g6cpr3kzyvohwoha
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK attrsAccessInsert: sys_core::SysAttrAccess {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
