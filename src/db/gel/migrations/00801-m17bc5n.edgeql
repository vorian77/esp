CREATE MIGRATION m17bc5nuzyaqnjlz6f2ki6skpqy4asy4t7tlomgvtncxm2rzrxveca
    ONTO m16chy3ez3wgh4j6xvtnwwqchb2izrve4agjwjdpihtkchoqlgglvq
{
          ALTER TYPE sys_user::SysTask {
      ALTER PROPERTY buttonStyle {
          RENAME TO btnStyle;
      };
  };
};
