CREATE MIGRATION m152fdf5pxjc6zbmp6zkvqq5ezzophvtxmbl3d3c7q3lvr7cymryya
    ONTO m1osnmv5obdd54ifizwzf4xjxrppx3icilqthz5uepiloqpsg4ndha
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customColDetailsSummary {
          RENAME TO detailsSummary;
      };
  };
};
