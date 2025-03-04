CREATE MIGRATION m1ocdaso2znfs25vqmpeweir53dpsbnknyjyrycdeu656jgjxiurwa
    ONTO m1bk66vhj3dbb4rrtkf5cg634prrz2nxuyvoo7p5uwh7obwtzvz7na
{
              ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
  };
};
