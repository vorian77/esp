CREATE MIGRATION m1h6uocoeomncgvadpoy7e5usut6jkz4rvmkgftp2nuebydnc4sdpa
    ONTO m1tjml6co3uhkt733gdzmnrkhuuuor2max2aaciou6jdpa2b7lryzq
{
          ALTER TYPE sys_core::SysCodeType {
      CREATE PROPERTY valueDecimal: std::float64;
      CREATE PROPERTY valueInteger: std::int64;
      CREATE PROPERTY valueString: std::str;
  };
};
