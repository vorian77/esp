CREATE MIGRATION m12lpwmy74nqtcmi4um3xgeu5cc2j7uyav5d3tagb73ifx5dgefhbq
    ONTO m14e7ayp5uxk2a2nad75enqj24miunkqdl7mmii2oldoq574ksc26a
{
              ALTER TYPE app_cm::CmCsfMsg {
      ALTER LINK codeStatus {
          RESET default;
      };
  };
};
