CREATE MIGRATION m1zupkwnaackv56nmpdimxtgz3zbfk6lmzx742dyjwv74tqdp64kyq
    ONTO m16ko2fwbdqrfzaoii6smixbgjrkn7fojxy23ufqwi5ggbtz3naodq
{
  CREATE TYPE sys_core::SysMsg EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE LINK office: sys_core::SysObjSubject;
      CREATE LINK parent: sys_core::SysMsg;
      CREATE MULTI LINK recipients: sys_user::SysUser;
      CREATE REQUIRED LINK sender: sys_user::SysUser;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY msg: std::str;
      CREATE PROPERTY subject: std::str;
  };
};
