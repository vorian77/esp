CREATE MIGRATION m1hgjvt3iymxb5nkx3lzhm5eavvnmz6dnmlkgnz3eneyk53aeizgma
    ONTO m152fdf5pxjc6zbmp6zkvqq5ezzophvtxmbl3d3c7q3lvr7cymryya
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY detailsSummary;
  };
};
