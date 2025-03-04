CREATE MIGRATION m1iwmkr33ldf3aibiebh4g7zqpx5vphkf237q22f4twpzaedcraqva
    ONTO m16yz3wh55orhdgh4xd6rrnivajqka6utoxf4un2kifpva2ni5yltq
{
              ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      ALTER LINK parmValueColumn {
          RENAME TO parmValueColumnValue;
      };
  };
};
