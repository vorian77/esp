CREATE MIGRATION m1keepqsbrmmzvf44gxahq2qcbnyipey6ykz3cfz6po7kcxqilm5eq
    ONTO m12s2v2kmyzmpdjuqipfhtgy4fh2mjtxxjmzfy5tvsagoepzn6yk2a
{
              ALTER TYPE sys_migr::SysMigrTargetColumn {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
};
