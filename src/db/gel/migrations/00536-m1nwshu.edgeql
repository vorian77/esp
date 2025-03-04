CREATE MIGRATION m1nwshuwmk4iejspxkhwpuqloj5jou643s7ktcrzvz5466rbow5kva
    ONTO m1lxmxxoaxyq7jqjnc2osp4dcjh24oqcp25wvmktsqh5qcahmgbuwq
{
              ALTER TYPE sys_core::SysOrg {
      CREATE MULTI LINK testCode: sys_core::SysCode;
      CREATE PROPERTY testDate: cal::local_date;
      CREATE PROPERTY testNumber: std::int64;
      CREATE PROPERTY testText: std::str;
  };
  ALTER TYPE sys_core::SysResource {
      DROP LINK testCode;
      DROP PROPERTY testDate;
      DROP PROPERTY testNumber;
      DROP PROPERTY testText;
  };
};
