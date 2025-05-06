CREATE MIGRATION m1qfu2qum7olvluqcl2ko54iegiibjm5lmnn27lkqa3koa4dy5dwmq
    ONTO m1gl7uxw6b6nwvwzarh6fdb2r72jtfdut7mblsndlt2xaejgp4baea
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE LINK table: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK table {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
