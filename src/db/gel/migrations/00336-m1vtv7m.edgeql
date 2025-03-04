CREATE MIGRATION m1vtv7m7yb2njvo2iwrv5gqnfsi3s4i4tqhfio2ntfve5a7wxlcdpq
    ONTO m1lmnqsvh43zesbsnhyg5ugt5iricfxpqgdm5emjbazrh74imlbipq
{
                  CREATE FUNCTION sys_rep::getAnalytic(name: std::str) -> OPTIONAL sys_rep::SysAnalytic USING (SELECT
      sys_rep::SysAnalytic
  FILTER
      (.name = name)
  );
};
