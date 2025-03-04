CREATE MIGRATION m1mpi3glu3t5ctfe2x2sj2oxgrdtqzbw2mygnoq3aggajfk7psou7q
    ONTO m1mbwenpal2mmyn2scxdeewwmaj6un3744ywfwsvkub3gkcsum7vqq
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isListHideSearch: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY isDisplayable {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
