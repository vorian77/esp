CREATE MIGRATION m14pdz2vxs5lcgbxaqoumxe5ad2nye7wexmh32x2kraeaosx2xluza
    ONTO m1phcw5eb4evfemv2mjjoc4xtass2o5rq3ibsx4j2zafg67rymlwmq
{
              ALTER TYPE app_cm::CmCourse {
      ALTER LINK cohorts {
          ON TARGET DELETE ALLOW;
      };
  };
};
