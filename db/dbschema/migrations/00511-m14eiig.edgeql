CREATE MIGRATION m14eiigerhv6k6xhqtrlgyyxmvphpw64mzohjqu3yfzdrgmxrarala
    ONTO m1mpi3glu3t5ctfe2x2sj2oxgrdtqzbw2mygnoq3aggajfk7psou7q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK customColCodeType;
      ALTER PROPERTY isDisplayable {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_db::SysColumn {
      ALTER LINK codeAlignment {
          RESET OPTIONALITY;
      };
  };
};
