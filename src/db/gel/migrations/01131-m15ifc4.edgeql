CREATE MIGRATION m15ifc4ch3v4zaugg2yyj3ha7qdjbfmcitcyf3lxsjlrh7hfipgm2q
    ONTO m1i5tpqndygjildbjjw76yb3jgr5dd4vgecep5t4auqtcd346uoboq
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET TYPE sys_core::ObjRootCore USING (.recipients[IS sys_core::ObjRootCore]);
      };
  };
};
