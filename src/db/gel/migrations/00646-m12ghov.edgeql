CREATE MIGRATION m12ghovhjpoteqvthn4k4ofrhykkthgkqws3iacx7c46744lhvzgta
    ONTO m1a2uhaivb5ifilt5rjsvl4zeehczcf72yvcocrwmzggwchxz3sxvq
{
              ALTER TYPE sys_core::SysObj {
      CREATE LINK newOwner: sys_core::SysSystem;
  };
};
