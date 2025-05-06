CREATE MIGRATION m1wasoaisui4nmehjt6i5b4b4s4cnvewvdhtivbm5r7xykqu6ha56q
    ONTO m1g565tarcwgv5tnnkhcp456w6kyfitgkumjlis5wyh6wqv2o2ryua
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK querySource: sys_core::SysQuerySource {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE LINK querySource: sys_core::SysQuerySource {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
