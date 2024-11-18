CREATE MIGRATION m12q2psv5zgbfeilqntbamrypbvdqwmhwhrwvn54ygxi5aqehkcpea
    ONTO m1b4zxs3jkes4b2j7o2unmiq3ttbumkstqrdxn4wb6bghaeeh7yewa
{
  CREATE TYPE app_cm::CmCsfMsg EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE LINK office: sys_core::SysObjSubject;
      CREATE LINK parent: app_cm::CmCsfMsg;
      CREATE MULTI LINK recipients: sys_user::SysUser;
      CREATE REQUIRED LINK sender: sys_user::SysUser;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY msg: std::str;
      CREATE PROPERTY subject: std::str;
  };
};
