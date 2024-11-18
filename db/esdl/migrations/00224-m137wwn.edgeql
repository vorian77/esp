CREATE MIGRATION m137wwnuabzsukoq2fw3cpsdgpeedgxfmvalrefrt7oiwibg5knsaq
    ONTO m1rzf7cw7pgdthtjz2qbeg6t73qpuvf7g7erdfy6bgaujzufyakmtq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customElement {
          RESET CARDINALITY USING (SELECT
              .customElement 
          LIMIT
              1
          );
      };
  };
};
