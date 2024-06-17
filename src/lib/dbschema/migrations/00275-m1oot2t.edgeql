CREATE MIGRATION m1oot2tkn5zujiw5gjqvfhwldd2r4ztz7jr63fv2lp4uyfurxtd5lq
    ONTO m1pp72dhio4lqgj2mdzx5h2qofrwuf7xyswdh5hoscves3a2yy33ga
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumns;
  };
};
