CREATE MIGRATION m144fw3kcsy22msfy6jobsuy6ljoux3ql4ip77yf5yjnzstrm724xq
    ONTO m1qnvdi6ml3bu245pvugzwa3tyx3myquzhkkc7go4ishmumxrxnwxa
{
              ALTER TYPE app_cm::CmCohort {
      DROP PROPERTY noteOld;
  };
  ALTER TYPE sys_core::SysNodeObj {
      DROP PROPERTY orderDefineOld;
  };
};
