CREATE MIGRATION m1u72szved7eae72sepavce32kng6d2n5w4qo4mkqgregaya47fpaq
    ONTO m1cqjcwmsuuzthmyjeckrjlaijxplc2wam6ms5tgrmsmcdepedxktq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY exprListEdit {
          RENAME TO listEditPresetExpr;
      };
  };
};
