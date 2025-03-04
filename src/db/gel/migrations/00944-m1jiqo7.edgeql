CREATE MIGRATION m1jiqo7roozqxvmkxhtaeup4mnds3syu7w4rodmezuqirdpid7jj6a
    ONTO m1e4pwhbzgttbrcr4iabp6skbgapw2zexnwukp53ij4asmxu2qe4nq
{
  CREATE TYPE sys_core::SysMsg EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE LINK parent: sys_core::SysMsg;
      CREATE MULTI LINK recipients: sys_user::SysUser;
      CREATE REQUIRED LINK sender: sys_user::SysUser;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY msg: std::str;
      CREATE PROPERTY subject: std::str;
  };
};
