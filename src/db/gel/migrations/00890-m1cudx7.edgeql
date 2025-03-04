CREATE MIGRATION m1cudx7bzjd6co7gzfg5mj7kvswjcz5yijllv77tf6qeb5vhilo4za
    ONTO m1l27gz335aqkhvynochxikbya6he6lirw23aqufcyxg247fscljgq
{
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeAction {
          SET TYPE sys_core::SysCodeAction USING (.codeAction[IS sys_core::SysCodeAction]);
      };
  };
};
