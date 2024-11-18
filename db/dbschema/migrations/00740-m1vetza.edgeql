CREATE MIGRATION m1vetza7uijc26kput6tw56cnrx2xbaa67fzr3gzcoiq64bws4t3sq
    ONTO m13fufoxhf5x6aagoxobldn7cegbzsckz35jw6osfqn7zjvt6z5zqq
{
  ALTER TYPE sys_user::SysUserTypeResource {
      CREATE PROPERTY test: std::str;
  };
};
