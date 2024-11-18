CREATE MIGRATION m15zuzsywgismgazp56vth4hg6hxpsbvk7mxtij4igl4ivhm4vshlq
    ONTO m1zhbqit4llh7mfz7zskwanwsbk6nbcj76zwarvl6xj4aaxpq2pisq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK codeDbSortDir {
          RENAME TO codeSortDir;
      };
  };
};
