CREATE MIGRATION m1icgpv37usmr3ctsnfgtunrflqbmrn6zeum4q5pxc5tciqnwkagva
    ONTO m1iwjtxw4i7rfdwe56nttgvxcw4igrihkiq46aa4jb35gaw7arlbmq
{
  ALTER TYPE sys_core::SysEligibility {
      DROP PROPERTY exprUpdate;
  };
};
