CREATE MIGRATION m1lbsxlxb4nn7sasjckkkczztnf7yg7q2qdi444l7i6xfjfeygg6ca
    ONTO m1yi5bylsy7l2zffdugbc22fnphrbnpio6rkijdjdt6azglu5mou6a
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK attrObjSite: sys_core::SysObjAttr;
  };
};
