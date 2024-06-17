CREATE MIGRATION m1sjch5d2wdxhcb46jczot35n3z4lso5oakb2wo5yg3zmaexeuhgta
    ONTO m1tb3uogdnugkdjmugy2kkiex4ak4422pfqu37n6gdpiblsehkhd5a
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY listOrderColumn;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK listOrderColumn: sys_db::SysColumn;
  };
};
