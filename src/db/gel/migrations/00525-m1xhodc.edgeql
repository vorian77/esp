CREATE MIGRATION m1xhodcuvrtldlgcmzrh527prhx4flh4pqjixt4zbnzhbrzvmqowoq
    ONTO m1wxsxggbevggyv7rjciiba7i5jbkd7a476czidfnoqltb4s4n6cra
{
              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY customEmbedShellFields;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK customEmbedShellFields: sys_core::SysDataObjColumn;
  };
};
