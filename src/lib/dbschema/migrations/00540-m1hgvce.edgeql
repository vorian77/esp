CREATE MIGRATION m1hgvcekpmxcp6p5q52mjvr6niwhgwzajvaianfxkbeujcmfqys6kq
    ONTO m1fh46rjpsfbs26i24kugtkg67hbtjvk3ncstly7avgzuje4fa2l6a
{
  CREATE TYPE app_cm::CmCsfSchoolPlacement EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeCollegeStatus: sys_core::SysCode;
      CREATE PROPERTY collegeGPA: std::str;
      CREATE PROPERTY collegeGradYear: std::int16;
      CREATE PROPERTY collegeMajor: std::str;
      CREATE PROPERTY collegeName: std::str;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
