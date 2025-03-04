CREATE MIGRATION m16brk5xepasc6yr72tjjaf5cbefhtacdzlz5jwa2fdllq2h26hzwq
    ONTO m1lucvnx5lq6lqdtn6uiagtnoeuzrza62jyp43cagsjqsg6vcg5ska
{
  ALTER FUNCTION sys_core::getObjRoot(name: std::str) {
      RENAME TO sys_core::getObjRootCore;
  };
};
