CREATE MIGRATION m1lipik2tf25bc3dj3ya3qgbats6tcekj3d3kc7cz74npdnvfpttyq
    ONTO m1qzb4fknyrljrhxr5r2d7dcnzcomri4jj6xbcsa6sqwbjngdfjz2a
{
  ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY isVerifiedByCaseManager;
  };
  ALTER TYPE app_cm::CmCsfEligibility {
      DROP LINK sysEligibility;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldEmbedDetailEligibility;
  };
};
