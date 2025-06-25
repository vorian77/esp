CREATE MIGRATION m1s2b4hedwi27ddr5ddamy4m7nizfonuwevpryrmrqdf4uc7wm2iuq
    ONTO m1o33hi4vcdr7luqhuhuwmh4ko53sdemdxpvit56n734en5ohzacgq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK codeDoQueryType;
  };
};
