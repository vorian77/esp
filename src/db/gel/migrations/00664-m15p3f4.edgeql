CREATE MIGRATION m15p3f46c7tdek5r5ntukjr3bwqg7e4ldsivsdazkala3r4f5ejsxa
    ONTO m1dr2xhixbejn7fte7c2czrqx7emz4y5uvde5enah4irur3r6q6shq
{
              ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK systems: sys_core::SysSystem;
  };
};
