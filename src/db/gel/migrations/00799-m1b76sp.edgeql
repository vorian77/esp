CREATE MIGRATION m1b76sptbksnylawwuphnsqw5n5x3qykmmdpsk2iblwunujvbov62q
    ONTO m1u5hy27hibooq5mkdgcige6hin3oprv2tzyidw7yiqzh5sfd2rfsa
{
          ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY fileNew;
      DROP PROPERTY fileOld;
  };
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY file: std::json;
  };
};
