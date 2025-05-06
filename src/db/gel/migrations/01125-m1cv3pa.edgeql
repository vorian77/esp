CREATE MIGRATION m1cv3pai22bfanqiz4h72z6mrcf3u2ftzp7cenjy3ktaznhvnd7csa
    ONTO m1wasoaisui4nmehjt6i5b4b4s4cnvewvdhtivbm5r7xykqu6ha56q
{
  ALTER TYPE sys_core::SysQuerySource {
      CREATE LINK parentColumn: sys_db::SysColumn;
      CREATE LINK parentTable: sys_db::SysTable;
      CREATE MULTI LINK queryRiders: sys_core::SysDataObjQueryRider {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY listEditPresetExpr: std::str;
      CREATE PROPERTY parentFilterExpr: std::str;
  };
};
