CREATE MIGRATION m1yu7vyolqnjuh5nkajoaz6xz6vsqq7jt4gtmt6ovnxpm3j7es5pla
    ONTO m1jrh66wv77lwxbe2df7s6g4aersfex27vidoqq7lzsrncilo6r3pa
{
              ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY expr {
          RENAME TO exprCustom;
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY name {
          RENAME TO nameCustom;
      };
  };
};
