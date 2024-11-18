CREATE MIGRATION m1wxsxggbevggyv7rjciiba7i5jbkd7a476czidfnoqltb4s4n6cra
    ONTO m1e3r2ns4sbbm3yhylshsy46x34qipduyd77mpjzzmd2lkusst4olq
{
  DROP TYPE default::SysFile;
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customEmbedShellFields: std::json;
  };
};
