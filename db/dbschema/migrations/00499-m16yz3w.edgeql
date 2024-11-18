CREATE MIGRATION m16yz3wh55orhdgh4xd6rrnivajqka6utoxf4un2kifpva2ni5yltq
    ONTO m1ymx6wetyayxbunakrfrtpcggwuvxsternbuw5rrtmnigliqp2jdq
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      CREATE LINK parmValueColumn: sys_db::SysColumn;
      CREATE LINK parmValueColumnType: sys_db::SysColumn;
  };
};
