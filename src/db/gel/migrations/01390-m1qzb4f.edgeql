CREATE MIGRATION m1qzb4fknyrljrhxr5r2d7dcnzcomri4jj6xbcsa6sqwbjngdfjz2a
    ONTO m1k2lz4ga65e3qjvjn3kpanfzmjbylraqqctpkrx54qp73irqcf23a
{
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE MULTI LINK cmEligibilityCategories: sys_core::SysCodeType;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY isVerifiedByCompliance;
  };
};
