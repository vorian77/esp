CREATE MIGRATION m1m27sccykpt2d2enfetgpkksfkwh6mf7qs7nbpp4nl63p57habpkq
    ONTO m1lrrdl6evzobrt65tbpdej36qhwawcjtd2vojqg6bbuuaytsv54kq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK eligibility;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK eligibility: sys_core::SysEligibility {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
