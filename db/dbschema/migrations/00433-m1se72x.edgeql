CREATE MIGRATION m1se72xlg2mknqxui3qtsf37mswytltw4ekepcyvzb2guvxqeji5da
    ONTO m1keepqsbrmmzvf44gxahq2qcbnyipey6ykz3cfz6po7kcxqilm5eq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY order {
          RENAME TO orderDefine;
      };
  };
};
