CREATE MIGRATION m17fehpe7cz6v3akhk53qhw4jlhng4dggwq7gvh7fkhlp2qtuwtaba
    ONTO m1smakscbcoczoeizdup43tsn7qrpc6mkf7sdw7tmnukkf6pjehsmq
{
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE LINK attr: sys_core::SysAttr;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK obj;
  };
};
