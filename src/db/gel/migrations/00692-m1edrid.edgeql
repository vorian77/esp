CREATE MIGRATION m1edridc6uprn2efnhcfaegkg3xpz7q2ag6n5kr3iewro2lp7suzgq
    ONTO m1ehdyizxlav5klnb7gutptqq5apytdtodyitjearays7a6fqpqkea
{
              ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isUserSelectedSystem {
          RENAME TO isSystemRootNode;
      };
  };
};
