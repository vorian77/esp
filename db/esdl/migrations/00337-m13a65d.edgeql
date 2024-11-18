CREATE MIGRATION m13a65dhchmrvk7dmcitoinlg72vlsa5irki2ugexwwodtfqdfx4rq
    ONTO m1vtv7m7yb2njvo2iwrv5gqnfsi3s4i4tqhfio2ntfve5a7wxlcdpq
{
      ALTER TYPE sys_rep::SysRep {
      ALTER LINK analytics {
          SET TYPE sys_rep::SysAnalytic USING (.analytics[IS sys_rep::SysAnalytic]);
      };
  };
};
