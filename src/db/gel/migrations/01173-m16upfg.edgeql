CREATE MIGRATION m16upfg6h6yvozm4w36ox53q6pnoqzwc2efcuqbm4vxpv22jglve2a
    ONTO m1pawhnabmgjaxkjvofvfjtgm3ccrh4corjjfb5p5iznrpquwnzigq
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY isClosee {
          RENAME TO isClosed;
      };
  };
};
