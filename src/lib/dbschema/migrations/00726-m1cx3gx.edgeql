CREATE MIGRATION m1cx3gxiu2uvtdh55z3kerktewrek3dcwnoc53vlwg5s7j7dx6hzuq
    ONTO m1ljegcawx7ltnzldrokmbyxfuv34mzuatungg4576zm6cw75rqdyq
{
  ALTER TYPE sys_db::SysTable {
      CREATE PROPERTY table := (((.mod ++ ' ') ++ .name));
  };
};
