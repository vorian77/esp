CREATE MIGRATION m1jnxcoxsxbks2lzewuj5bvbhxsdmp4vcgtvgzfcgjnrn6cwladoeq
    ONTO m1hx7iiaehqxrex5ln6rknbfwexp74qlns4zh52wy2j2gq63v72zpq
{
              ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK linkTable: sys_db::SysTable;
  };
};
