CREATE MIGRATION m1xaqsivpackxf2lqbq5rm4z6f7j2dzuiegzft3kxvbmm47f3oansa
    ONTO m1c4v6hzy6rk6vjxcfmp5275d2eue4s3zgsc6okzxxrzxthpedxcjq
{
  ALTER TYPE sys_rep::SysRepUser {
      ALTER PROPERTY headerUser {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
