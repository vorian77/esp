CREATE MIGRATION m1lxmxxoaxyq7jqjnc2osp4dcjh24oqcp25wvmktsqh5qcahmgbuwq
    ONTO m1xnqvsqq5w5dibovacyvn2nyxieasav6fdp4w4anzjvappsxd5guq
{
  ALTER TYPE sys_core::SysResource {
      CREATE MULTI LINK testCode: sys_core::SysCode;
      CREATE PROPERTY testDate: cal::local_date;
      CREATE PROPERTY testNumber: std::int64;
      CREATE PROPERTY testText: std::str;
  };
};
