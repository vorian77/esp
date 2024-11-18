CREATE MIGRATION m126p5ynf6dkqao625zp2xj4de2x2ex7qvup7pm64fcssmqdk6jcta
    ONTO m137wwnuabzsukoq2fw3cpsdgpeedgxfmvalrefrt7oiwibg5knsaq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK linkCardinality: sys_core::SysCode;
  };
};
