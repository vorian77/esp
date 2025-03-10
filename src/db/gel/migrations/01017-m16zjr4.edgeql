CREATE MIGRATION m16zjr4dbrwt6umj5l7gdsg5y6dblnkzor2cri36hav72mzra4pmtq
    ONTO m1clhtg73rpolurmoxudt5aa3hdmhp4dv5lkklogv5ldpmf5lqygha
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeEligibilityStatus {
          RENAME TO codeServiceFlowEligibilityStatus;
      };
  };
};
