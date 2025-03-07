CREATE MIGRATION m1uxtj4ydd3ggu5dybou7sh5zhruczgdyxoikemf7qsy7por75i3rq
    ONTO m1s7jusqppesgim2xx45jf3jrvcpvf3q7sdbg2lojg5ksbc2bp3myq
{
  ALTER TYPE sys_core::SysSystem {
      CREATE MULTI LINK entitySystems: sys_core::SysSystem;
  };
};
