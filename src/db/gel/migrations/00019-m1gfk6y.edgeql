CREATE MIGRATION m1gfk6yhg63jfwngps5hj5exj6kx5mwra2acwu2xcbsh765thodrga
    ONTO m1akw6umyngboio5pt3fntfezmjzpjl4vei6llaz47fxcujksh4r7q
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER PROPERTY valueTargetExpr {
          RENAME TO valueTriggerExpr;
      };
  };
};
