CREATE MIGRATION m1soin4rbkclzmb5ijxhj5wck6z56pde2z3hgosov5mmcuy6m7hy3a
    ONTO m1h7hw657ldxzxrdnodqnxgg5ke7deazxx5bhpz52tsfibxha6zcjq
{
  ALTER TYPE sys_core::SysObj {
      ALTER LINK owner {
          RENAME TO ownerSys;
      };
  };
};
