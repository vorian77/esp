CREATE MIGRATION m1lb52bnvtfqfxn7ybblxmoze7qun2addh6sldkxu7gbcyuvhjstoa
    ONTO m13nhp5ewg33epf343zghvojzdqv2b5xccuqjllzry5vtts64w5ykq
{
  ALTER TYPE sys_core::SysApp {
      DROP PROPERTY test;
  };
};
