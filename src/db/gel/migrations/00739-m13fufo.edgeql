CREATE MIGRATION m13fufoxhf5x6aagoxobldn7cegbzsckz35jw6osfqn7zjvt6z5zqq
    ONTO m1jnxcoxsxbks2lzewuj5bvbhxsdmp4vcgtvgzfcgjnrn6cwladoeq
{
              ALTER TYPE sys_rep::SysRepEl {
      DROP LINK linkTable;
  };
};
