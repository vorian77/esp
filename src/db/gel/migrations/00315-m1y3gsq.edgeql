CREATE MIGRATION m1y3gsqe3gqd5gswmn2qcqcit5cyxz6ibpjwhjnxxae245wr2djioa
    ONTO m1kfbipolt4ppqdfl43rorejjyubs7chxftuqtcdrviaah75qqqrrq
{
                  CREATE MODULE sys_rep IF NOT EXISTS;
  CREATE TYPE sys_rep::SysRepAnalytic EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK parmDefnCodeType: sys_core::SysCodeType;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY expr: std::str;
      CREATE PROPERTY parmDefnNbr1: std::int16;
      CREATE PROPERTY parmDefnNbr2: std::int16;
  };
  CREATE TYPE sys_rep::SysRepEl EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY order: std::int16;
  };
  CREATE TYPE sys_rep::SysRep EXTENDING sys_core::SysObj {
      CREATE MULTI LINK analytics: sys_rep::SysRepAnalytic {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK elements: sys_rep::SysRepEl {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY description: std::str;
  };
  CREATE TYPE sys_rep::SysRepUserAnalytic EXTENDING sys_rep::SysRepEl {
      CREATE REQUIRED LINK analytic: sys_rep::SysRepAnalytic;
      CREATE LINK parmCode1: sys_core::SysCode;
      CREATE PROPERTY parmNbr1: std::int16;
      CREATE PROPERTY parmNbr2: std::int16;
  };
  CREATE TYPE sys_rep::SysRepUser EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK report: sys_rep::SysRep;
      CREATE MULTI LINK analytics: sys_rep::SysRepUserAnalytic {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE PROPERTY descriptionUser: std::str;
  };
  CREATE TYPE sys_rep::SysRepElCol EXTENDING sys_rep::SysRepEl {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
