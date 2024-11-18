CREATE MIGRATION m1pp72dhio4lqgj2mdzx5h2qofrwuf7xyswdh5hoscves3a2yy33ga
    ONTO m1n6pq7sbcyygevzqvetebvsrsatooschermewiezn4vaoa7owmxaa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumns: sys_db::SysColumn;
  };
};
