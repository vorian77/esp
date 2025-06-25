CREATE MIGRATION m1o33hi4vcdr7luqhuhuwmh4ko53sdemdxpvit56n734en5ohzacgq
    ONTO m1b66cvtnirry42vhjwqe76mjr53nrexkyf7ndj4rqoaqbjzerynaa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK codeDoRenderPlatform;
  };
};
