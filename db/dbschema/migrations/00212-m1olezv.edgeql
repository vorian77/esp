CREATE MIGRATION m1olezvgpatzc3d2mi7ajmwj2pztrthe23kwdwbl5whhtfobeewpmq
    ONTO m1ok3kidp44piik26w4jlonxx4mvot5olv5rfc4ths33wvsytkhg2a
{
  ALTER TYPE sys_db::SysColumn {
      DROP PROPERTY link;
  };
};
