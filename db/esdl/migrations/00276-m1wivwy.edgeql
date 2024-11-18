CREATE MIGRATION m1wivwy2bw3f2cq4wrqwtj346ycs3dzmlksz7pzqclfoanen5tyzxq
    ONTO m1oot2tkn5zujiw5gjqvfhwldd2r4ztz7jr63fv2lp4uyfurxtd5lq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumns: sys_db::SysColumn;
  };
};
