CREATE MIGRATION m13vfannmk5kqfbwfbritunufb2gdrtzme6ddfh5tj5b5btbdzhadq
    ONTO m1ar34gfqecs7cxniqk3wv7sqdajshic2evbjchdkhu4c3gp2fxuua
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK column {
          SET REQUIRED USING (<sys_db::SysColumn>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK columnBacklink: sys_db::SysColumn;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isBacklink;
  };
};
