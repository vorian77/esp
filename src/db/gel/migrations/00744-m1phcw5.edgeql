CREATE MIGRATION m1phcw5eb4evfemv2mjjoc4xtass2o5rq3ibsx4j2zafg67rymlwmq
    ONTO m14zsapnnmgdtoc33m5j54bqye2fajsgphzb4anu5jseishl2ytwhq
{
              ALTER TYPE sys_core::SysObjNote {
      ALTER LINK owner {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
