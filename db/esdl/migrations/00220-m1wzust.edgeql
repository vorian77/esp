CREATE MIGRATION m1wzustbfs7shhhlhnwiz5nucnlmibbr57whycnrp3ysrslunq3ykq
    ONTO m1xvvprdbgjbzxbysg6ck75yk3thnaxrv3tbxuf2oiwfghsvva5fva
{
                  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK columns {
          ON TARGET DELETE ALLOW;
      };
  };
};
