CREATE MIGRATION m1clhtg73rpolurmoxudt5aa3hdmhp4dv5lkklogv5ldpmf5lqygha
    ONTO m1kmd3ytl5xcyu5zzeyz5bokqfgpinpgmpmopbbv3iltfsiljvf3jq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK codeStatus {
          RENAME TO codeEligibilityStatus;
      };
  };
};
