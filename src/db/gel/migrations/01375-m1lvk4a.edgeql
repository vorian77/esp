CREATE MIGRATION m1lvk4aizrw2b4sqlij2dgehemhxwl5hdo4s4pv2dudb6o6fkm4yla
    ONTO m1m27sccykpt2d2enfetgpkksfkwh6mf7qs7nbpp4nl63p57habpkq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER PROPERTY nodeValues {
          RENAME TO fieldEmbedDetailEligibility;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK eligibility;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldEmbedDetailEligibility: sys_core::SysEligibility {
          ON TARGET DELETE ALLOW;
      };
  };
};
