CREATE MIGRATION m1duj3rsaq6cu4r5ub2fhusa3sfqo5pihebq374mkas7ru6z636liq
    ONTO m1bt2d6yfukpnykchvi4exjfxo4brmd5ahsr6ookrwnvkacvwgx45a
{
                              ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER PROPERTY exprWidth {
          RENAME TO exprWith;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER PROPERTY exprWidthProperty {
          RENAME TO exprWithProperty;
      };
  };
};
