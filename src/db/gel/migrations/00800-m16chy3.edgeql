CREATE MIGRATION m16chy3ez3wgh4j6xvtnwwqchb2izrve4agjwjdpihtkchoqlgglvq
    ONTO m1b76sptbksnylawwuphnsqw5n5x3qykmmdpsk2iblwunujvbov62q
{
          ALTER TYPE sys_core::SysOrg {
      DROP LINK codeLogoFileType;
      DROP PROPERTY logoFileName;
  };
  ALTER TYPE sys_user::SysTask {
      CREATE PROPERTY buttonStyle: std::str;
      CREATE PROPERTY exprStatus: std::str;
  };
};
