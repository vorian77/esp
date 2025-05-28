CREATE MIGRATION m1ujr4j4hc3rqsy6ytujlklcin3iog53qhtow5sssmb5vbsisdokwa
    ONTO m1d4yy6oonp5mtyre2yz34p6ntlxmxmag74fq7ojgvuig35upn6mca
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET TYPE sys_core::SysObjAttr USING (.recipients[IS sys_core::SysObjAttr]);
      };
      ALTER LINK sender {
          SET TYPE sys_core::SysObjAttr USING (.sender[IS sys_core::SysObjAttr]);
      };
  };
};
