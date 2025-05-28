CREATE MIGRATION m1tdpkdegppi33yw5ws4s3xtnkm7j37qbq57ehku5l4xb3lgrh435q
    ONTO m1zakrzxnnv2jjafce5gtmf3oknkwl44ham2pizciyqiqwro37ye4a
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI PROPERTY testItemsMulti: std::str;
      CREATE PROPERTY testItemsSingle: std::str;
  };
};
