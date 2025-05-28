CREATE MIGRATION m1j3rrnoy6uup5wsoznnwcrl3jnikstnxrp4uet4dq4gac6lyduunq
    ONTO m1tdpkdegppi33yw5ws4s3xtnkm7j37qbq57ehku5l4xb3lgrh435q
{
  ALTER TYPE sys_core::ObjRoot {
      DROP PROPERTY testItemsMulti;
      DROP PROPERTY testItemsSingle;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK items;
  };
  DROP TYPE sys_core::SysDataObjColumnItemValue;
  ALTER TYPE sys_core::SysMsg {
      DROP LINK threadOpen;
      ALTER PROPERTY createdAt {
          RESET default;
      };
      DROP PROPERTY date;
      DROP PROPERTY isOpen;
  };
};
