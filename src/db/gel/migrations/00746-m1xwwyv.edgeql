CREATE MIGRATION m1xwwyvmcjeytbfklnogtf3ui5ykssnmdvel4at5yihl4eiozhbqlq
    ONTO m14pdz2vxs5lcgbxaqoumxe5ad2nye7wexmh32x2kraeaosx2xluza
{
              ALTER TYPE app_cm::CmCsfDocument {
      ALTER PROPERTY isShareWithClient {
          SET TYPE std::bool USING (<std::bool>false);
      };
  };
};
