CREATE MIGRATION m1nf3jwj5noqc3ln3xliqf7vmfaicb6vtfvrtsl2gkzgux62yzgxqa
    ONTO m12ejfwb2gv57plh6kf5doonwgemyxr6yerve5fabm5iw2jm6vadgq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customEmbedShellFields {
          ON SOURCE DELETE ALLOW;
          RESET ON TARGET DELETE;
      };
  };
};
